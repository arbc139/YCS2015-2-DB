class SubmitterController < ApplicationController
  skip_before_filter :verify_authenticity_token

  ######################################### INDEX ACTION #########################################
  def index
    hello = 'Hi, I am Submitter!'
    logger.info hello
    render json: {'hello' => hello}
  end

  # 참여 신청 가능한 테스크 목록
  def taskApplyIndex
    logger.info 'Yeah GET taskApplyIndex come on!'
    method_message = 'SUBMITTER) task apply index'
    
    @submitter = User.find(params[:user_id])
    @other_tasks = Task.where.not(id: @submitter.tasks.ids)

    respond_to do |format|
      format.html
      if @submitter.submitter?
        format.json { render json: @other_tasks.as_json(
          only: [:id, :t_name, :description, :minimum_upload_period, :task_data_table_name, :task_data_table_schema]
          ) }

      # 만약 submitter가 아니면 에러
      else
        format.json { render json: @submitter.youShallNotPass(method_message) }
      end
    end
  end

  # 참여승인된 뒤에 참여하고 있는 테스크 목록
  def taskParticipateIndex
    logger.info 'Yeah GET taskParticipateIndex come on!'
    method_message = 'SUBMITTER) task participate index'
    
    @submitter = User.find(params[:user_id])

    r_user_submits = @submitter.r_user_submits.where(is_accepted: true)
    @participate_tasks = []
    r_user_submits.each do |rus|
      @participate_tasks << rus.task
    end

    logger.info @participate_tasks.as_json

    respond_to do |format|
      format.html
      if @submitter.submitter?
        format.json { render json: @participate_tasks.as_json(
          only: [:id, :t_name, :description, :minimum_upload_period, :task_data_table_name, :task_data_table_schema],
          methods: [:raw_data_types!]
          ) }

      # 만약 submitter가 아니면 에러 
      else
        format.json { render json: @submitter.youShallNotPass(method_message) }
      end
    end
  end

  ######################################### SHOW ACTION #########################################
  def taskInfoShow
    method_message = 'SUBMITTER) task info show'
    
    @submitter = User.find(params[:user_id])
    @task = Task.find(params[:task_id])

    # submitter가 Task에 제출한 파일 수
    # submitter가 Task에 제출한 파일들 중, pass한 파일 수 (get from TDT)
    # 원본 데이터 타입 별로 자신이 제출한 파일들의 현황 (파싱시퀀스파일 record 보여주고, pass/non-pass 여부 order by 회차)
    submitted_pdsfs = @submitter.submit_pds_files.where(task: @task)
    @all_pdsfs_num = submitted_pdsfs.size
    # FIXIT: - 영훈이 함수 사용
    @passed_pdsfs_num = 0
    pdsfs_by_rdt = submitted_pdsfs.order(:raw_data_type_id).order(:inning).group_by(&:raw_data_type_id)
    
    # parsing only needed informations
    @pdsfs_info = Hash.new
    pdsfs_by_rdt.each do |rdt, pdsf|
      @pdsfs_info[rdt] = pdsf.as_json(only: [:id, :period, :inning, :all_tuple_num, :duplicated_tuple_num, :data_quality_score, :is_valued, :is_passed])
      logger.info rdt
      logger.info @pdsfs_info[rdt]
    end

    result = {
      no_of_submitted_file: @all_pdsfs_num,
      no_of_passed_file: @passed_pdsfs_num,
      pdsfs_by_rdt: @pdsfs_info
    }

    respond_to do |format|
      format.html
      format.json { render json: result.as_json }
    end
  end
  
  ######################################### UPDATE ACTION #########################################
  def taskApplyUpdate
    method_message = 'SUBMITTER) task apply update'
    
    @submitter = User.find(params[:user_id])
    @task = Task.find(params[:task_id])

    logger.info 'Yeah Participation Update POST come on!'
    
    # user가 submitter가 아닐 때
    if !@submitter.submitter?
      render json: @submitter.youShallNotPass(method_message)

    # user(submitter)가 task에 참여신청을 하지 않았을 때
    elsif RUserSubmit.find_by(user: @submitter, task: @task).blank?
      # user(submitter)에 참여하는 task 추가
      @submitter.tasks << @task
      render json: {method_message => 'submitter join in the task successfully, update permissioned'}

    # 이미 user가 task에 참여신청을 했을 때
    else
      render json: {method_message => 'submitter already joined in the task, update denied'}
    end
  end

  ######################################### CREATE ACTION #########################################
  def taskSubmitCreate
    logger.info 'Hey, olaf! are you there?'
    method_message = 'SUBMITTER) task submit create'
    
    ### post params 목록
    # csv (csv파일 string 버전)
    # user_id (submitter의 id)
    # task_id (task의 id)
    # rdt_id (raw_data_type id)
    # period (회차)
    # inning (기간)

    @csv = params[:csv]
    @submitter_id = params[:user_id]
    @valuer = User.get_random_valuer
    @task = Task.find(params[:task_id])
    @rdt = RawDataType.find(params[:rdt_id])
    @period = params[:period]
    @inning = params[:inning]

    logger.info params[:csv]
    logger.info @rdt.schema
    logger.info @task.task_data_table_schema

    parse_result = ParsingDataSequenceFile.parsing_file(params[:csv], @rdt.schema, @task.task_data_table_schema)
    # parse_result = parsing_file(params[:csv], rdt_schema, tdt_schema) # 영훈이의 파싱 함수 호출
    # return [:all_tuple_num], [:duplicated_tuple_num], [:col_null_ratios], [:parsed_file]

    @pdsf = ParsingDataSequenceFile.new(pdsf_params(parse_result, @period, @inning, @submitter_id, @valuer.id, @task.id, @rdt.id))

    if @pdsf.save
      parse_result[:col_null_ratios].each do |col, null_ratio|
        ParseColumnNullRatio.create(
          column_name: col,
          null_ratio: null_ratio,
          parsing_file_id: @pdsf.id
        )
      end
      render json: {method_message => 'save successfully'}

    else
      render json: {method_message => 'save failed!'}
    end
  end

  private
  def pdsf_params(parse_result, period, inning, submitter_id, valuer_id, task_id, rdt_id)
    {
      data_blob: parse_result[:parsed_file],
      period: period,
      inning: inning,
      all_tuple_num: parse_result[:all_tuple_num],
      duplicated_tuple_num: parse_result[:duplicated_tuple_num],
      
      submitter_id: submitter_id,
      valuer_id: valuer_id,
      task_id: task_id,
      raw_data_type_id: rdt_id
    }
  end
end

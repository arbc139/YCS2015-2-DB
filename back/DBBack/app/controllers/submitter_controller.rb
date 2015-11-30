class SubmitterController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  ######################################### INDEX ACTION #########################################
  def index
    logger.info 'I am here!'
  end

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

  def taskParticipateIndex
    logger.info 'Yeah GET taskParticipateIndex come on!'
    method_message = 'SUBMITTER) task participate index'

    @submitter = User.find(params[:user_id])
    @participate_tasks = @submitter.tasks

    respond_to do |format|
      format.html
      if @submitter.submitter?
        format.json { render json: @participate_tasks.as_json(
          only: [:id, :t_name, :description, :minimum_upload_period, :task_data_table_name, :task_data_table_schema]
          methods: [:raw_data_types!]
          ) }

      # 만약 submitter가 아니면 에러 
      else
        format.json { render json: @submitter.youShallNotPass(method_message) }
      end
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
    @task = Task.find(params[:task_id])
    @rdt = RawDataType.find(params[:rdt_id])
    @period = period
    @inning = inning
    
    # parse_result = parsing_file(params[:csv], rdt_schema, tdt_schema) # 영훈이의 파싱 함수 호출
    # return [:all_tuple_num], [:duplicated_tuple_num], [:col_null_ratios], [:parsed_file]
    
    @pdsf = ParsingDataSequenceFile.new(pdsf_params(parse_result, @period, @inning, @submitter_id, @task.id, @rdt.id))
    
    parse_result[:col_null_ratios].each do |col, null_ratio|
      ParseColumnNullRatio.create(
        column_name: col,
        null_ratio: null_ratio,
        parsing_file_id: @pdsf.id
      )
    end
  end

  private
  def pdsf_params(parse_result, period, inning, submitter_id, task_id, rdt_id)
    {
      data_blob: parse_result[:parsed_file],
      period: period,
      inning: inning,
      all_tuple_num: parse_result[:all_tuple_num],
      duplicated_tuple_num: parse_result[:duplicated_tuple_num],
      
      submitter_id: submitter_id,
      task_id: task_id,
      raw_data_type_id: rdt_id
    }
  end
end

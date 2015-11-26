class AdminController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  ######################################### INDEX ACTION #########################################
  def taskIndex
    @tasks = Task.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @tasks.as_json(
        only: [:id, :name, :description, :minimum_upload_period, :task_data_table_name, :task_data_table_schema]
        ) }
    end
  end

  def userIndex
    @users = User.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @users.as_json(
        only: [:id, :str_id, :name, :sex, :address, :birth, :phone_number, :value_score, :role],
        methods: :age
        ) }
    end
  end

  def rdtIndex
    @raw_data_types = RawDataType.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @raw_data_types.as_json(
        only: [:id, :name, :schema]
        ) }
    end
  end

  ######################################### SHOW ACTION #########################################
  # GET /users/1
  def userShow
    """
    @user = User.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render :json => @user }
    end
    """

    @user = User.find(params[:id])

    respond_to do |format| 

      if @user.submitter?
        logger.info 'I am Submitter~'
        submitter_and_tasks = Hash.new
        submitter_and_tasks[:user] = @user.as_json(only: [:id, :str_id, :role])
        @tasks = @user.tasks
        tasklist = []
        @tasks.each do |task|
          tasklist << task.as_json(only: [:id, :name])
        end
        submitter_and_tasks[:tasks] = tasklist.as_json
        logger.info tasklist.as_json
        logger.info submitter_and_tasks

        format.html
        format.json { render :json => submitter_and_tasks }

      # FIXIT: - valuer is not implemented, yet.
      elsif @user.valuer?
        logger.info 'I am Valuer~'
        valuer_and_files = Hash.new
        valuer_and_files[:user] = @user.as_json(only: [:id, :str_id, :role])
        @files = @user.evaluate_pds_files
        filelist = []
        @files.each do |file|
          filelist << file.as_json(only: [:id, :task_name, :period, :inning, :all_tuple_num, :duplicated_tuple_num])
        end
        valuer_and_files[:files] = filelist.as_json

        format.html
        format.json { render :json => valuer_and_files }

      else  # Error case
        logger.info 'I am Error~'
        format.json { render :json => error_hash("User Error") }
      end

    end
  end

  def taskManageShow
    @task = Task.find(params[:task_id])
    @users = @task.users
    @raw_data_types = @task.raw_data_types

    respond_to do |format|

      task_hash = Hash.new
      task_hash[:users] = @users.as_json(only: [:id, :str_id, :name, :sex, :address, :birth, :role, :value_score])
      task_hash[:rdts] = @raw_data_types.as_json(only: [:id, :name])
      
      format.html
      format.json { render :json => task_hash }
    end
  end

  ######################################### CREATE ACTION #########################################
  # curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"task":{"name":"TASK_NAME_test","description":"TASK_DESCRIPTION_test","minimum_upload_period":"TASK_MIN_test","task_data_table_schema":”TASK_DTS_test"}, "raw_data_types": [{"id":"1","schema":"RAW_DATA_TYPE1_schema"},{"id":"2","schema":"RAW_DATA_TYPE2_schema"}]}' http://localhost:3000/api/admin/task
  def taskCreate
    # FIXIT :- need to change :raw_data_type
    logger.info "Yeah Task POST come on!"
    @task = Task.new(task_params) # put task informations
    raw_data_type_list = params[:raw_data_types] # put raw_data_type informations
    raw_data_type_list.each do |raw_data_type|
      @task.raw_data_types << RawDataType.find(raw_data_type[:id])
    end

    logger.info "Save completed?"

    respond_to do |format|
      if @task.save
        #session[:user_id] = @user.id

        format.html { redirect_to '/api/users', notice: 'User was successfully created.' }
        format.json { render json: @task.as_json(only: [:id, :name]) }
      else
        #redirect_to '/signup' # => 'users#new'
        format.html { render action: 'new' }
        result = Hash.new
        result["error"] = "wrong"
        format.json { render json: result }
      end
    end
  end


  ######################################### TOOL METHOD #########################################
  private
  def task_params
    params.require(:task).permit(:name, :description, :minimum_upload_period, :task_data_table_name, :task_data_table_schema)
    # :name, :description, :minimum_upload_period, :task_data_table_schema
  end


  # 동적 테이블 생성 튜토리얼 스크립트들
  def create_tdt(tdt)
    ## tdt[:name] 이름을 가진 테이블 동적 생성
    unless ActiveRecord::Base.connection.table_exists?(tdt[:name])
      logger.info 'gogo?'
      ActiveRecord::Base.connection.create_table tdt[:name] do |t|
        # :id is created automatically
        tdt[:col].each do |col|
          logger.info 'column created??'
          t.column col[:name], col[:type]
        end
      end

    else
      ActiveRecord::Base.connection.exec_query('DROP TABLE TEST')
      logger.info ActiveRecord::Base.connection.tables
      
      #logger.info 'nono?'
      #ActiveRecord::Base.connection.exec_query('INSERT INTO TEST(test_column1, test_column2, test_column3) VALUES ("hi", "hello", 3030)')
      #result = ActiveRecord::Base.connection.exec_query('SELECT * FROM TEST')
      #logger.info result.to_hash
    end
  end

  # 동적 테이블 생성할때 기본 FORM
  def tdt
    tdt = Hash.new
    # :name 태그는 테스크 데이터 테이블 이름을 의미함.
    tdt[:name] = 'TEST'
    
    # :col 태그는 테스크 데이터 테이블의 컬럼의 리스트를 의미함.
    col_list = []

    col_list << {
      type: 'string',
      name: 'test_column1'
    } << {
      type: 'string',
      name: 'test_column2'
    } << {
      type: 'integer',
      name: 'test_column3'
    }

    tdt[:col] = col_list

    tdt
  end

end

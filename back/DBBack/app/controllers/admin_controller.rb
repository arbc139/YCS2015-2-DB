class AdminController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  ######################################### INDEX ACTION #########################################
  def index
    hello = 'Hi, I am Admin!'
    logger.info hello
    render json: {'hello' => hello}
  end

  def taskIndex
    @tasks = Task.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @tasks.as_json(
        only: [:id, :t_name, :description, :minimum_upload_period, :task_data_table_name, :task_data_table_schema]#,
        #methods: [:raw_data_types!]
        )}
    end
  end

  def userIndex
    @users = User.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @users.as_json(
        only: [:id, :str_id, :u_name, :sex, :address, :birth, :phone_number, :value_score, :role],
        methods: [:age, :participate_tasks]
        ) }
    end

  end

  def rdtIndex
    @raw_data_types = RawDataType.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @raw_data_types.as_json(
        only: [:id, :raw_name, :schema]
        ) }
    end
  end

  def pdsfIndex
    @pdsfs = ParsingDataSequenceFile.all

    respond_to do |format|
      format.html
      format.json {render :json => @pdsfs.as_json(
        except: [:valuer_id, :submitter_id, :task_id, :raw_data_type_id],
        methods: [:valuer!, :submitter!, :null_ratios!]
        ) }
    end
  end

  ######################################### SHOW ACTION #########################################
  def userShow
    method_message = 'ADMIN) user Show'
    
    @user = User.find(params[:id])

    respond_to do |format| 

      if @user.submitter?
        logger.info 'I am Submitter~'
        submitter_and_tasks = Hash.new
        submitter_and_tasks[:user] = @user.as_json(only: [:id, :str_id, :role])
        @tasks = @user.tasks
        tasklist = []
        @tasks.each do |task|
          tasklist << task.as_json(only: [:id, :t_name])
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
          filelist << file.as_json(only: [:id, :data_blob, :period, :inning, :all_tuple_num, :duplicated_tuple_num, :is_valued, :is_passed])
        end
        valuer_and_files[:files] = filelist.as_json

        format.html
        format.json { render :json => valuer_and_files }

      elsif @user.admin?
        format.html
        format.json { render :json => @user.youShallNotPass(method_message) }

      else  # Error case
        logger.info 'I am Error~'
        format.json { render :json => {method_message => 'user type is not exist'} }
      end

    end
  end

  def taskManageShow
    method_message = 'ADMIN) task manage show'

    @task = Task.find(params[:task_id])
    @users = @task.unaccepted_submitters

    respond_to do |format|

      task_hash = Hash.new
      task_hash[:submitters] = @users.as_json(only: [:id, :u_name, :str_id, :sex, :address, :birth, :role, :value_score])
      task_hash[:rdts] = @raw_data_types.as_json(only: [:id, :raw_name])

      format.html
      format.json { render :json => task_hash }
    end
  end

  def taskStatShow
    method_message = 'ADMIN) task stat show'

    @task = Task.find(params[:task_id])
    @users = @task.accepted_submitters
    @raw_data_types = @task.raw_data_types

    respond_to do |format|

      task_hash = Hash.new
      task_hash[:no_of_submitted_files] = @task.no_of_submitted_files
      task_hash[:no_of_passed_files] = @task.no_of_passed_files
      task_hash[:submitters] = @users.as_json(only: [:id, :u_name, :str_id, :sex, :address, :birth, :role, :value_score])
      
      format.html
      format.json { render :json => task_hash }
    end
  end

  ######################################### CREATE ACTION #########################################
  def taskCreate
    method_message = 'ADMIN) task create'
    
    # FIXIT :- need to change :raw_data_type
    logger.info 'Yeah Task POST come on!'
    @task = Task.new(task_params) # put task informations
    raw_data_type_list = params[:raw_data_types] # put raw_data_type informations
    raw_data_type_list.each do |raw_data_type|
      @task.raw_data_types << RawDataType.find(raw_data_type[:id])
    end

    logger.info "Save completed?"

    if @task.save
      render json: @task.as_json(only: [:id, :t_name])
    else
      render json: {method_message => 'create fail'}
    end
  end


  def rdtCreate
    method_message = 'ADMIN) raw data type create'
    logger.info 'Yeah Raw Data Type POST come on!'
    @rdt = RawDataType.new(rdt_params) # put rdt informations

    if @rdt.save
      render json: @rdt.as_json
    else
      render json: {method_message => 'create fail'}
    end
  end

  ######################################### UPDATE ACTION #########################################
  def participateUpdate
    method_message = 'ADMIN) participate update'
    
    @user = User.find(params[:user_id])
    @task = Task.find(params[:task_id])

    logger.info 'Yeah Participation Update POST come on!'
    # if participate accepted
    if params[:accept]
      if RUserSubmit.find_by(user: @user, task: @task).update_attributes(:is_accepted => true)
        log_message = 'submitter access allowed, update success'
        logger.info log_message
        render json: {method_message => log_message}
      else
        log_message = 'submitter access allowed, but update failed'
        logger.info log_message
        render json: {method_message => log_message}
      end

    # if participate denied
    else
      # disconnect relationship between @user, @task
      if RUserSubmit.where(user: @user, task: @task).any? && @task.users.delete(@user)
        log_message = 'submitter access denied, delete success'
        logger.info log_message
        render json: {method_message => log_message}
      else
        log_message = 'submitter access denied, but delete failed'
        logger.info log_message
        render json: {method_message => log_message}
      end
    end
  end

  def adminInfoUpdate
    method_message = 'ADMIN) info update'
    
    @user = User.find(params[:user_id])

    if @user.admin?
      if @user.update_attributes(:password => params[:password])
        log_message = 'password change allowed, info update success'
        render json: {method_message => log_message}
      else
        log_message = 'password change not allowed, info update failed'
        render json: {method_message => log_message}
      end
    else
      render json: @user.youShallNotPass(method_message)
    end

  end


  ######################################### TOOL METHOD #########################################
  private
  def task_params
    params.require(:task).permit(:t_name, :description, :minimum_upload_period, :task_data_table_name, :task_data_table_schema)
    # :name, :description, :minimum_upload_period, :task_data_table_schema
  end

  def rdt_params
    params.require(:raw_data_type).permit(:raw_name, :schema)
    # :raw_name, :schema
  end

end

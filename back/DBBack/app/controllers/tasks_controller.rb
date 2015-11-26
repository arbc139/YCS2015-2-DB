class TasksController < ApplicationController
  def index
    @tasks = Task.all

    respond_to do |format|
      format.html # index.html.erb
      """
      result = Hash.new
      @tasks.each do |task|
        result[task] = task.raw_data_types
      end
      """

      format.json { render json: @tasks.as_json(
        only: [:id, :name, :description, :minimum_upload_period, :task_data_table_name, :task_data_table_schema]
        ) }
    end
  end
  
  # curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"task":{"name":"TASK_NAME_test","description":"TASK_DESCRIPTION_test","minimum_upload_period":"TASK_MIN_test","task_data_table_schema":”TASK_DTS_test"}, "raw_data_types": [{"id":"1","schema":"RAW_DATA_TYPE1_schema"},{"id":"2","schema":"RAW_DATA_TYPE2_schema"}]}' http://localhost:3000/api/admin/task
  def create
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

  private
  def task_params
    params.require(:task).permit(:name, :description, :minimum_upload_period, :task_data_table_name, :task_data_table_schema)
    # :name, :description, :minimum_upload_period, :task_data_table_schema
  end
end
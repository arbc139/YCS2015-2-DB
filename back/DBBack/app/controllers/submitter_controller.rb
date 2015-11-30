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
    @other_tasks = Task.where.not(id: @submitter.tasks.ids).take

    respond_to do |format|
      format.html
      format.json { render json: @other_tasks.as_json(
        only: [:id, :t_name, :description, :minimum_upload_period, :task_data_table_name, :task_data_table_schema]
        ) }
    end
  end

  def taskParticipateIndex
    logger.info 'Yeah GET taskParticipateIndex come on!'
    method_message = 'SUBMITTER) task participate index'

    @submitter = User.find(params[:user_id])
    @participate_tasks = @submitter.tasks

    respond_to do |format|
      format.html
      format.json { render json: @participate_tasks.as_json(
        only: [:id, :t_name, :description, :minimum_upload_period, :task_data_table_name, :task_data_table_schema]
        ) }
    end
  end

  ######################################### UPDATE ACTION #########################################
  def taskApplyUpdate
    method_message = 'SUBMITTER) task apply update'
    
    @submitter = User.find(params[:user_id])
    @task = Task.find(params[:task_id])

    logger.info 'Yeah Participation Update POST come on!'
    # user(submitter)가 task에 참여신청을 하지 않았을 때
    if RUserSubmit.find_by(user: @submitter, task: @task).blank?
      log_message = 'submitter join in the task successfully, update permissioned'
      # user(submitter)에 참여하는 task 추가
      @submitter.tasks << @task
      render json: {method_message => log_message}

    # 이미 user가 task에 참여신청을 했을 때
    else
      log_message = 'submitter already joined in the task, update denied'
      render json: {method_message => log_message}
    end
  end
end

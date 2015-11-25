class SessionsController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :create
  
  def new
    # need to communicate with AngularJS (receive json)
    logger.info "Yeah Session GET come on!"
    
    logger.info params

    respond_to do |format|
      @user = User.find_by_str_id(params[:str_id])
      logger.info @user
      if @user && @user.authenticate(params[:password])
        #format.html { redirect_to '/api/users', notice: 'Session was successfully created.' }
        format.json { render json: @user.as_json(only: [:id, :str_id, :role]) }
      else
        #format.html { redirect_to '/api/users', notice: 'Session was failed.' }
        format.json { render json: error_hash("Session Error") }
      end
    end
  end
end

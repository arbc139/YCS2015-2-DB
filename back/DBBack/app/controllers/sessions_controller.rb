class SessionsController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :create
  
  def new
    
  end
  
  def create
    # need to communicate with AngularJS (receive json)
    logger.info "Yeah POST come on!"

    respond_to do |format|
      logger.info "format???"
      logger.info format
      @user = User.find_by_str_id(params[:str_id])
      if @user && @user.authenticate(params[:password])
        # session[:current_user] is created, initialized to @user.id
        # :current_user is just 'key'
        session[:user_id] = @user.id
        format.html { redirect_to '/api/users', notice: 'Session was successfully created.' }
        format.json { render :json => @user }
      else
        format.html { redirect_to '/api/users', notice: 'Session was created.' }
        format.json { render :json => @user }
      end
    end
  end
  

  def destroy
    # FIXIT :- user_id to change
    session[:user_id] = nil
    redirect_to '/'
  end
end

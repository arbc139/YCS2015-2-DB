class SessionsController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :create
  
  def new
    
  end
  
  def create
    # need to communicate with AngularJS (receive json)
    logger.info "Yeah POST come on!"

    respond_to do |format|
      @user = User.find_by_str_id(params[:str_id])
      if @user && @user.authenticate(params[:password])
        # session[:current_user] is created, initialized to @user.id
        # :current_user is just 'key'
        session[:user_id] = @user.id
        render :json => @user
        """
        format.html { redirect_to '/api/users', notice: 'Session was successfully created.' }
        format.json { render :json => @user }
        """
      else
        render :json => @user.errors
      end
    end
  end
  

  def destroy
    # FIXIT :- user_id to change
    session[:user_id] = nil
    redirect_to '/'
  end
end

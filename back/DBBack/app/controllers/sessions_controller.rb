class SessionsController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :create
  
  def new
    
  end
  
  def create
    # need to communicate with AngularJS (receive json)
    logger.info "Yeah POST come on!"
    @user = User.find_by_str_id(params[:session][:str_id])
    if @user && @user.authenticate(params[:session][:password])
      # session[:current_user] is created, initialized to @user.id
      # :current_user is just 'key'
      session[:user_id] = @user.id
      redirect_to '/'
    else
      redirect_to '/login'
    end
  end
  

  def destroy
    # FIXIT :- user_id to change
    session[:user_id] = nil
    redirect_to '/'
  end
end

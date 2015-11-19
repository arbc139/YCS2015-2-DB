class SessionsController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :create
  """
  def new
    
  end
  """
  
  def create
    # need to communicate with AngularJS (receive json)
    logger.info "Yeah Session POST come on!"
    
    respond_to do |format|
      @user = User.find_by_str_id(params[:str_id])
      logger.info @user
      if @user && @user.authenticate(params[:password])
        # session[:current_user] is created, initialized to @user.id
        # :current_user is just 'key'
        """
        session[:user_id] = @user.id
        if @user.admin?
          format.html { redirect_to '/api/admin', notice: 'Session was successfully created.' }
        elsif @user.submmiter?
          format.html { redirect_to '/api/submitter', notice: 'Session was successfully created.' }
        elsif @user.valuer?
          format.html { redirect_to '/api/users', notice: 'Session was successfully created.' }
        else
          format.html { redirect_to '/api/error' }
        end
        """
        #render :json => @user
        #format.html { redirect_to '/api/users', notice: 'Session was successfully created.' }
        format.json { render json: @user.as_json(only: [:id, :str_id, :role]) }
      else
        #format.html { redirect_to '/api/users', notice: 'Session was failed.' }
        error = Hash.new
        error["error"] = "wrong"
        format.json { render json: error }
      end
    end
  end
  
  """
  def destroy
    # FIXIT :- user_id to change
    session[:user_id] = nil
    redirect_to '/'
  end
  """
end

class UsersController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  # GET /users
  # GET /users.json
  def index
    @users = User.all

    if current_user
      logger.info 'current user exist'
    else
      logger.info 'current user not exist'
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @users }
    end
  end

  # GET /users/1
  def show
    """
    @user = User.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render :json => @user }
    end
    """
    """
    @user = User.find(params[:id])

    respond_to do |format|
      if user.admin?
        format.html { render :text => }
        # { redirect_to '/users', notice: 'Go to admin version.' }
        format.json { render :json => @user }
      elsif user.submitter?
        format.html { redirect_to '/users', notice: 'Go to submitter version.' }
        format.json { render :json => @user }
      else user.valuer?
        format.html { redirect_to '/users', notice: 'Go to valuer version.' }
        format.json { render :json => @user }
    end
    """
  end

  # GET /users/new
  # GET /users/new.json
  def new
    @user = User.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @user }
    end
  end

  # GET /users/1/edit
  # GET /users/1/edit.json
  def edit
    """
    @user = User.find(params[:id])
    """
  end

  # POST /users
  # POST /users.json
  # POST : 
  # curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d ' {"user":{"str_id":"test_str_id","password":"test_password","name":"test_name","sex":"test_sex","address":"test_address", "birth":"test_birth", "phone_number":"test_phone_number", "value_score":"test_value_score", "role":"test_role"}}' http://localhost:3000/users
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        #session[:user_id] = @user.id
        #redirect_to '/'
        session[:user_id] = @user.id
        logger.info '>>>>>>>>>>>>>>>>'
        logger.info session[:user_id]
        format.html { redirect_to '/users', notice: 'User was successfully created.' }
        format.json { render :json => @user }
      else
        #redirect_to '/signup' # => 'users#new'
        format.html { render action: 'new' }
        format.json { render :json => @user.errors }
      end
    end
  end

  # PUT /users/1
  # PUT /users/1.json
  def update
    """
    @user = User.find(params[:id])

    respond_to do |format|
      if @user.update_attributes(params[:activity])
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
    """
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    """
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
    """
  end

  # tool methods
  private
  def user_params
    params.require(:user).permit(:str_id, :password, :name, :sex, :address, :birth, :phone_number, :value_score, :role)
    # information = request.raw_post
    # data_parsed = JSON.parse(information)
    #information = request.raw_post
    #data_parsed = JSON.parse(information)
    #params.require(:user).permit(data_parsed)
  end

  def renderActionInOtherController(controller,action,params)
    c = controller.new
    c.params = params
    c.dispatch(action, request)
    c.response.body
  end
end

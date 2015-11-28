class SessionsController < ApplicationController
  skip_before_filter :verify_authenticity_token#, :only => :userCreate
  
  ######################################### FIND ACTION #########################################
  def userFind
    # need to communicate with AngularJS (receive json)
    logger.info "Yeah Session GET come on!"
    
    logger.info params

    respond_to do |format|
      @user = User.find_by_str_id(params[:str_id])
      logger.info @user
      if @user && @user.authenticate(params[:password])
        format.html { redirect_to '/api/users', notice: 'Session was successfully created.' }
        format.json { render json: @user.as_json(only: [:id, :str_id, :role]) }
      else
        format.html { redirect_to '/api/users', notice: 'Session was failed.' }
        format.json { render json: error_hash("Session Error") }
      end
    end
  end


  ######################################### CREATE ACTION #########################################
  # curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d ' {"user":{"str_id":"test_str_id","password":"test_password","name":"test_name","sex":"test_sex","address":"test_address", "birth":"test_birth", "phone_number":"test_phone_number", "value_score":"test_value_score", "role":"test_role"}}' http://localhost:3000/users
  def userCreate
    logger.info "Yeah User POST come on!"
    @user = User.new(user_params)
    
    if @user.save
      render json: @user.as_json(only: [:id, :str_id, :role])
    else
      render json: {'SESSION) user create' => 'create fail'}
    end
  end

  private
  def user_params
    if !params[:submitter].blank?
      params.require(:submitter).permit(:str_id, :password, :u_name, :sex, :address, :birth, :phone_number, :value_score, :role)
    elsif !params[:valuer].blank?
      params.require(:valuer).permit(:str_id, :password, :u_name, :sex, :address, :birth, :phone_number, :role)
    end
  end

end

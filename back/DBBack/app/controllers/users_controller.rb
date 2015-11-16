class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to '/'
    else
      redirect_to '/signup'
    end
  end

  private
  def user_params
    params.require(:user).permit(:str_id, :password, :name, :sex, :address, :birth, :phone_number, :value_score, :role)
    # information = request.raw_post
    # data_parsed = JSON.parse(information)
    #information = request.raw_post
    #data_parsed = JSON.parse(information)
    #params.require(:user).permit(data_parsed)
  end
end

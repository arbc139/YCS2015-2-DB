class ValuerController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  
  def index
    hello = 'Hi, I am Valuer!'
    logger.info hello
    

    render json: {'hello' => hello}
  end
end

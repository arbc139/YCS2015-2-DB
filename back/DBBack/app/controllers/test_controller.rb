class TestController < ApplicationController
  def testCSVCreate
    @csv_str = params[:csvFile]

    logger.info @csv_str

    render json: {'fuck' => 'god fuck yeah'}
  end
end

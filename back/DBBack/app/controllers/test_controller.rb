class TestController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  def index
    @pdsf = ParsingDataSequenceFile.first
    logger.info @pdsf.quantity_score
    
    @task = Task.first

    logger.info 'gogo?'
    @task.save_file_to_tdt(@pdsf.data_blob, @pdsf.submitter.u_name)
    logger.info 'hello?'

    logger.info @task.get_all_tdt.as_json

    logger.info @task.export_CSV.as_json

    render json: {'hey! check the terminal!' => 'ok'}
  end
end

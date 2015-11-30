class TestController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  def testCSVCreate
    @csv_str = params[:csv]

    @pdsf = ParsingDataSequenceFile.new(test_pdsf_params(@csv_str))

    if @pdsf.save
      render json: @pdsf.as_json
    else
      render json: {'fucked' => 'fucked'}
    end
  end

  def test_pdsf_params(csv_str)
    {
      data_blob: csv_str,
      period: 10,
      inning: 10,
      all_tuple_num: 10,
      duplicated_tuple_num: 10,
      is_valued: false,
      data_quality_score: 10,
      is_passed: false,
      
      valuer_id: 4,
      submitter_id: 2,
      task_id: 1,
      raw_data_type_id: 1
    }
  end
end

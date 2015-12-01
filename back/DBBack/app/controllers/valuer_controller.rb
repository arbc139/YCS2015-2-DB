class ValuerController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  
  ######################################### INDEX ACTION #########################################
  def index
    hello = 'Hi, I am Valuer!'
    logger.info hello

    render json: {'hello' => hello}
  end

  def pdsfNotValuedIndex
    method_message = 'VALUER) pdsf not valued index'
  
    @valuer = User.find(params[:user_id])
    if !@valuer.valuer?
      render json: {method_message => 'user is not valuer'}
    else
      @pdsfs = @valuer.evaluate_pds_files.where(is_valued: false)

      respond_to do |format|
        format.html
        format.json { render json: @pdsfs.as_json(only: [:id, :data_blob, :period, :inning, :all_tuple_num, :duplicated_tuple_num, :data_quality_score, :is_valued, :is_passed]) }
      end
    end
  end

  def pdsfValuedIndex
    method_message = 'VALUER) pdsf valued index'
    
    @valuer = User.find(params[:user_id])
    if !@valuer.valuer?
      render json: {method_message => 'user is not valuer'}
    else
      @pdsfs = @valuer.evaluate_pds_files.where(is_valued: true)

      respond_to do |format|
        format.html
        format.json { render json: @pdsfs.as_json(only: [:id, :data_blob, :period, :inning, :all_tuple_num, :duplicated_tuple_num, :data_quality_score, :is_valued, :is_passed]) }
      end
    end
  end

  ######################################### UPDATE ACTION #########################################
  def pdsfUpdate
    method_message = 'VALUER) value update'
    ## parameter
    # pdsf id
    # value_score
    # is_passed

    @file = ParsingDataSequenceFile.find(params[:pdsf_id])
    @value_score = params[:value_score]
    @is_passed = params[:is_passed]

    # update
    if @file.update_attributes(data_quality_score: @file.data_quality_score+@value_score, is_passed: @is_passed)
      # data_blob to TDT
      # FIXIT:-영훈이 함수 호출
      # 1 if @is_passed
      render json: {method_message => 'file update success'}
    else
      render json: {method_message => 'file update failed'}
    end
  end

end

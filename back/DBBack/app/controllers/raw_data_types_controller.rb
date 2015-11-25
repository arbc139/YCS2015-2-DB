class RawDataTypesController < ApplicationController
  def index
    @raw_data_types = RawDataType.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @raw_data_types.as_json(
        only: [:id, :name, :schema]
        ) }
    end
  end
end

class User < ActiveRecord::Base
  # helper method --> decrypt password, encrypt password
  has_secure_password

  has_many :evaluate_pds_files
  has_many :submit_pds_files
    
  has_many :r_user_submits
  has_many :tasks, through: :r_user_submits

  # my method
  def admin?
    self.role == 'admin'
  end

  def valuer?
    self.role == 'valuer'
  end
  
  def submitter?
    self.role == 'submitter'
  end
end

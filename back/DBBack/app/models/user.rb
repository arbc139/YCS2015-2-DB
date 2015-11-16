class User < ActiveRecord::Base
  # helper method --> decrypt password, encrypt password
  has_secure_password

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

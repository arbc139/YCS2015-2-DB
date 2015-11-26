class User < ActiveRecord::Base
  # helper method --> decrypt password, encrypt password
  has_secure_password

  has_many :evaluate_pds_files
  has_many :submit_pds_files
    
  has_many :r_user_submits
  has_many :tasks, through: :r_user_submits

  # user custom methods
  def admin?
    self.role == 'admin'
  end

  def valuer?
    self.role == 'valuer'
  end
  
  def submitter?
    self.role == 'submitter'
  end

  def age
    birthday = self.birth
    now = Time.now.utc.to_date
    now.year - birthday.year - (birthday.to_date.change(:year => now.year) > now ? 1 : 0)
  end

  def participate_tasks
    self.tasks.as_json(only: [:id, :t_name])
  end
end

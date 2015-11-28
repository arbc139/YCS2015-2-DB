class User < ActiveRecord::Base
  # helper method --> decrypt password, encrypt password
  has_secure_password

  has_many :evaluate_pds_files, :class_name => 'ParsingDataSequenceFile', :foreign_key => 'valuer_id'
  has_many :submit_pds_files, :class_name => 'ParsingDataSequenceFile', :foreign_key => 'submitter_id'
  
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
  
  def is_accepted?(task)
    self.role == 'submitter' && RUserSubmit.find_by(user: self, task: task).is_accepted
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
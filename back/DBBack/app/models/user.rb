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

  def no_of_submitted_files
    self.submit_pds_files.size
  end

  def no_of_passed_files
    # get from TDT (need to implement Task Data Table)
    0
  end

  def self.get_random_valuer
    User.where(role: 'valuer').sample
  end

  def youShallNotPass(method_message)
    if self.admin?
      {method_message => 'user is admin!'}
    elsif self.submitter?
      {method_message => 'user is submitter!'}
    elsif self.valuer?
      {method_message => 'user is valuer!'}
    else
      {method_message => 'WE FUCKED....'}
    end
  end
end

Rails.application.routes.draw do
  root 'users#index'

  #################################### TEST Place ####################################
  get '/api/test/' => 'test#index'

  #################################### LOGIN, SIGN UP (USER) ####################################
  ## 옛날 html 시절의 코드들... 무시해도된디~
  # 전체 user를 뿌려주는 액션
  get '/api/users' => 'users#index'
  # user 등록창
  get '/api/signup' => 'users#new'
  ###########

  ## 앵제) Login 창에서 Login 버튼을 눌렀을 때
  # str_id, password를 받아서 특정 User를 찾아주는 액션
  get '/api/login' => 'sessions#userFind'

  ## 앵제) Sign Up 창에서 Sign Up 버튼을 눌렀을 때
  # 유저 정보들을 받아서 유저를 디비에 추가시켜주는 액션
  post '/api/users' => 'sessions#userCreate'

  ## 앵제) 회원 탈퇴 버튼을 눌렀을 때
  # 유저 id를 받아서 유저를 디비에서 삭제시키는 액션
  delete '/api/users/:id' => 'sessions#userDestroy'

  #################################### ADMIN ####################################
  get '/api/admin' => 'admin#index'

  ## Admin 페이지에서 전체 리스트 가져오는 액션
  # 전체 테스크 목록 가져오기 액션
  get '/api/admin/tasks' => 'admin#taskIndex'
  # 전체 유저 목록 가져오기 액션
  get '/api/admin/users' => 'admin#userIndex'
  # 전체 원본 데이터 타입 가져오기 액션
  get '/api/admin/rdts' => 'admin#rdtIndex'
  # 전체 Parsing Data File 가져오기 액션
  get '/api/admin/pdsfs' => 'admin#pdsfIndex'
  
  ## Admin 페이지에서 특정 정보 가져오는 액션
  # 특정 유저 정보 가져오기 액션
  get '/api/admin/users/:id' => 'admin#userShow'
  # 특정 테스크의 유저정보, 원본데이터정보 가져오기 액션 #(?task_id=1)
  get '/api/admin/tasks/manage' => 'admin#taskManageShow'
  # 특정 테스크의 통계 정보 가져오기 액션 #(?task_id=1)
  get '/api/admin/tasks/stat' => 'admin#taskStatShow'

  ## Admin 페이지에서 정보를 디비에 추가하는 액션
  # 테스크 추가 액션
  post '/api/admin/tasks' => 'admin#taskCreate'
  # 원본 데이터 타입 추가 액션
  post '/api/admin/rdts' => 'admin#rdtCreate'

  ## Admin 페이지에서 정보를 디비에 업데이트하는 액션
  # Admin 페이지의 특정 테스크 관리 페이지에서 제출자의 테스크 참가를 수락/거절하는 액션
  # parameter
  # "task_id": 1, "user_id": 1, "accept": true
  post '/api/admin/tasks/manage' => 'admin#participateUpdate'

  # Admin의 비밀번호를 업데이트하는 액션
  # parameter
  # "user_id" : 1, "password" : "something"
  post '/api/admin/info' => 'admin#adminInfoUpdate'

  #################################### SUBMITTER ####################################
  get '/api/submitter' => 'submitter#index'
  ###########

  ## Submitter 페이지에서 테스크 목록을 가져오는 액션
  # submitter가 참가 신청 가능한 테스크 목록 가져오기 액션
  get '/api/submitter/tasks/apply' => 'submitter#taskApplyIndex'
  # submitter가 참가하고 있는 테스크 목록 가져오기 액션
  get '/api/submitter/tasks/participate' => 'submitter#taskParticipateIndex'
  # submitter가 참가하고 있는 테스크의 info 보기 (task_id, user_id)
  get '/api/submitter/tasks/info' => 'submitter#taskInfoShow'

  ## Submitter 페이지에서 테스크 참가신청 했을 때
  post '/api/submitter/tasks/apply' => 'submitter#taskApplyUpdate'

  ## Submitter 페이지에서 정보를 디비에 추가하는 액션
  # submitter가 해당 테스크에 원본 데이터 파일을 업로드 했을 때
  post '/api/submitter/tasks/submit' => 'submitter#taskSubmitCreate'


  #################################### SUBMITTER ####################################
  get '/api/valuer' => 'valuer#index'
  ###########

  ## Valuer 페이지에서 정보 가져오기 액션
  # valuer에게 할당된 아직 평가 안된 pdsf를 가져오기 액션
  get '/api/valuer/pdsfs/notvalued' => 'valuer#pdsfNotValuedIndex'
  # valuer가 평가했던 pdsf 가져오기 액션
  get '/api/valuer/pdsfs/valued' => 'valuer#pdsfValuedIndex'

  ## Valuer 페이지에서 정보 업데이트 액션
  # valuer가 해당 파일을 평가했을 때
  post '/api/valuer/pdsfs/notvalued' => 'valuer#pdsfUpdate'



  ############################################################################################################
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

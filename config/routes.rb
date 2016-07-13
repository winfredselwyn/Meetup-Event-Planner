Rails.application.routes.draw do
  
  root to: 'site#index'
  
  namespace :api do
    namespace :v1 do
      resources :events, only: [:index, :create, :destroy, :update]
    end
  end

  # resources :events
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
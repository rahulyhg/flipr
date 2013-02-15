require 'sinatra/base'

module Flipr
  class Demo < Sinatra::Base
    set :public_folder, 'public'
  end
end

require 'sinatra'

set :public_folder, 'public'

get '/' do
  redirect "/flipr_demo.html"
end

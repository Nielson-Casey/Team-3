OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['543407072416702'], ENV['5b2fb603fd2895bc2983a3ed4a1299bf']
end

# Source: https://github.com/mkdynamic/omniauth-facebook
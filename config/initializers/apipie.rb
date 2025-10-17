Apipie.configure do |config|
  config.app_name                = "DonkeyAssessment"
  config.app_info                = "API for a social media application with posts, comments, and likes functionality"
  config.api_base_url            = ""
  config.doc_base_url            = "/apipie"
  config.api_controllers_matcher = "#{Rails.root}/app/controllers/**/*.rb"
  config.authenticate = false
end

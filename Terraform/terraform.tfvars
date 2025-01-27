// container_app_environment_id set in pipeline
// container_app_environment_static_ip_address set in pipeline
// subscription_id set in pipeline
// image set in pipeline
// repository_name set in pipeline
// sha set in pipeline
// github_token set in pipeline
// resource_group_name set in pipeline
// registry_username set in pipeline
// auth_secret set in pipeline

max_replicas    = 5
min_replicas    = 1
cpu             = "0.25"
memory          = "0.5Gi"
registry_server = "ghcr.io"
port            = 5000
origin          = "https://enemy.sh"
twenty_api_endpoint = "https://api.twenty.com/rest"

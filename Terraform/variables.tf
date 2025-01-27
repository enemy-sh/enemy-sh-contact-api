variable "subscription_id" {
  type        = string
  description = "The subscription ID"
}

variable "resource_group_name" {
  type        = string
  description = "The resource group name"
}

variable "container_app_environment_id" {
  type        = string
  description = "The environment ID"
}

variable "image" {
  type        = string
  description = "The image name"
}

variable "repository_name" {
  type        = string
  description = "The repository name"
}

variable "sha" {
  type        = string
  description = "The image sha"
}

variable "github_token" {
  type        = string
  description = "The github token"
  sensitive   = true
}

variable "registry_username" {
  type        = string
  description = "The registry username"
  sensitive   = true
}

variable "auth_secret" {
  type        = string
  description = "The auth secret"
  sensitive   = true
}

// variables not driven by pipeline
variable "cpu" {
  type        = string
  description = "CPU request"
}

variable "memory" {
  type        = string
  description = "Memory request"
}

variable "max_replicas" {
  type        = number
  description = "The maximum number of replicas"
}

variable "min_replicas" {
  type        = number
  description = "The minimum number of replicas"
}

variable "registry_server" {
  type        = string
  description = "The registry server"
}

variable "port" {
  type        = number
  description = "The port number of the container"
}

variable "origin" {
  type        = string
  description = "The host name of the origin"
}

variable "twenty_api_endpoint" {
  type        = string
  description = "The API endpoint of the twenty api"
}

variable "twenty_api_key" {
  type        = string
  description = "The API key of the twenty api"
  sensitive   = true
}
variable "ec2_snapshon_lambda_name" {
    default = "ec2-snapshot-lambda"
}

variable "lambda_role_ec2_arn" {
    type = string
}

variable "cloud_watch_rule" {
    default = "ec2-snapshot-daily"
}

variable "bastion_admin_id" {
    type = string
}
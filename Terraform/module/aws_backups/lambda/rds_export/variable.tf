variable "lambda_rds_fun_name" {
    default = "rds_snapshot_lambda"
}

variable "lambda_rds_role_name" {
    type = string

}

variable "cloud_watch_rule_name" {
    default = "rds-snapshot-daily"
}
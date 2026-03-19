variable "s3_backup_name" {
    default = "s3-backup-diplom421"
}

variable "s3_backups_region" {
    default = "us-east-1"
}

variable "lambda_role_upload" {
    default = "lambda-role-upload"
}

variable "lambda_role_ec2" {
    default = "lambda-role-ec2"
}

variable "lambda_role_rds" {
    default = "lambda-role-rds"
}

variable "lambda_role_policy_upload" {
    default = "lambda-role-policy-upload"
}

variable "lambda_role_policy_ec2" {
    default = "lambda-role-policy-ec2"
}

variable "lambda_role_policy_rds" {
    default = "lambda-role-policy-rds"
}

variable "rds_role_backup" {
    default = "rds-role-backup"
}

variable "rds_role_policy_backups" {
    default = "rds-role-policy-backup"
}
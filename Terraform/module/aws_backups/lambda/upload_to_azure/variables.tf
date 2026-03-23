variable "labmda_upload_name" {
    default = "upload_to_azure_lambda"
}

variable "lambda_role_upload_arn" {
    type = string
}

variable "s3_backup_name_value" {
    type = string
}

variable "sas_token_value" {
    type = string
}

variable "stor_account_import" {
    type = object({
        stor_account_name = string
        res_gr_name = string
        container_name = string
    })
}
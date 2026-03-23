variable "con_str_value" {
  type = string
}

variable "stor_account_import" {
  type = object({
    stor_account_name = string
    res_gr_name = string
    container_name = string
  })
}

variable "rds_id" {
  type = string
}

variable "bastion_admin_id" {
    type = string
}
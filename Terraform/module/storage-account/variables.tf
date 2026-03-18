variable "az_blob_stor_conf" {
    type = object({
      resource_gr_name = string
      locations = string
      storage_account_name = string
      container_name = string

    })
    default = {
        resource_gr_name = "backups-group"
        locations = "France Central"
        storage_account_name = "sanabackup"
        container_name = "backup-cont"
    }
}
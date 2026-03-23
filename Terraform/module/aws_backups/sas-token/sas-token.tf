data "azurerm_storage_account_sas" "backup_sas" {
  connection_string = var.con_str_value

  https_only = true
  start      = "2026-01-01"
  expiry     = "2030-01-01"

  services {
    blob  = true
    queue = false
    table = false
    file  = false
  }

  resource_types {
    service   = true
    container = true
    object    = true
  }

  # ПЕРЕРАБОТАННЫЙ permissions БЛОК ДЛЯ v4.x
  permissions {
    read    = true
    write   = true
    delete  = true
    list    = true

    add     = false
    create  = false
    update  = false
    process = false
    tag     = false
    filter  = false
  }
}
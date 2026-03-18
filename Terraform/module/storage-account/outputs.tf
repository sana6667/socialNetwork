output "blob_stor_export" {
    value = {
       stor_account_name = azurerm_storage_account.az_stor_account.name
       res_gr_name = azurerm_resource_group.res_sg.name
       container_name = azurerm_storage_container.container.name
    }
}
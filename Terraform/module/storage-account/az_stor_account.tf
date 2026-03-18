resource "azurerm_resource_group" "res_sg" {
    name = var.az_blob_stor_conf.resource_gr_name
    location = var.az_blob_stor_conf.locations
}

resource "azurerm_storage_account" "az_stor_account" {
    name = var.az_blob_stor_conf.storage_account_name
    resource_group_name = azurerm_resource_group.res_sg.name
    location = azurerm_resource_group.res_sg.location
    account_tier = "Standard"
    account_replication_type = "LRS"
    public_network_access_enabled = false
    https_traffic_only_enabled = true
    allow_nested_items_to_be_public = false

    tags = {
        name = "bac-diplom"
    }
}

resource "azurerm_storage_container" "container" {
    name = var.az_blob_stor_conf.container_name
    storage_account_id = azurerm_storage_account.az_stor_account.id
    container_access_type = "private"
}
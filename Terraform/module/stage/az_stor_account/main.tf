provider "azurerm" {
    features {}
}

module "az_stor_account" {
    source = "../../storage-account"
}

output "rg_azure_name" {
    description = "Resource group azure name"
    value = module.az_stor_account.blob_stor_export.res_gr_name
}

output "storage_account_name" {
    description = "Azure storage account name"
    value = module.az_stor_account.blob_stor_export.stor_account_name
}

output "container_name" {
    description = "Azure storage container name"
    value = module.az_stor_account.blob_stor_export.container_name
}
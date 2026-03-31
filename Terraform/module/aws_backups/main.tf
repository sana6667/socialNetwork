terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.60"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}



module "eventBrigeCron" {
    source = "./eventBrigeCron"
}

module "lambda_snapshot_ec2" {
    source = "./lambda/ec2_snapshot"
    lambda_role_ec2_arn = module.s3_backup.lambda_role_ec2
    bastion_admin_id = var.bastion_admin_id
}

module "lambda_snapshot_rds" {
    source = "./lambda/rds_export"
    lambda_rds_role_name = module.s3_backup.lambda_role_rds
    rds_id = var.rds_id
    
    
}

/*
module "lambda_upload" {
    source = "./lambda/upload_to_azure"
    lambda_role_upload_arn = module.s3_backup.lambda_role_upload
    s3_backup_name_value = module.s3_backup.s3_backup_name
    stor_account_import = var.stor_account_import
    sas_token_value = module.sas_token.sas_token
    
}


module "sas_token" {
    source = "./sas-token"
    con_str_value = var.con_str_value
}
*/
module "s3_backup" {
    source = "./s3-backups"
}

output "s3_bac_arn" {
  value = module.s3_backup.s3_backup_arn
}


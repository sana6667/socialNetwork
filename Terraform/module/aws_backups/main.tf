module "eventBrigeCron" {
    source = "./eventBrigeCron"
}

module "lambda_snapshot_ec2" {
    source = "./lambda/ec2_snapshot"
    labmda_role_ec2_arn = module.s3_backup.lambda_role_ec2
}

module "lambda_snapshot_rds" {
    source = "./lambda/rds_export"
    lambda_rds_role_name = module.lambda_snapshot_ec2.labmda_role_rds
}

module "lambda_upload" {
    source = "./s3-backups"
}

module "sas_token" {
    source = "./sas-token"
}

module "s3_backup" {
    source = "./s3-backups"
}
terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = ">= 5.60"
        }

    }
}

provider "aws" {
    region = "us-east-1"
}

module "iam_roles" {
    source = "../module/iam-roles"
}

module "terr_state_s3" {
    source = "../module/s3-tf-backend"
}

module "ecr" {
    source = "../module/ecr"
}

output "tf_s3_arn" {
    value = module.terr_state_s3.s3_id_nam
}

output "tf_s3_name" {
    value = module.terr_state_s3.tf_s3_name
}

output "tf_s3_info" {
    value = module.terr_state_s3.s3_info
}
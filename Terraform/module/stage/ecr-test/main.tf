terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~>5.60"
        }
    }
}

provider "aws" {
    region = "us-east-1"
}

module "ecr_test" {
    source = "../../ecr"
}

output "ecr_name" {
    description = "ECR name"
    value = module.ecr_test.ecr_name
}

output "ecr_arn" {
    description = "ECR ARN"
    value = module.ecr_test.ecr_arn
}

output "ecr_url" {
    description = "ECR URL"
    value = module.ecr_test.conf_ecr_export
}

output "ecr_id" {
    description = "ECR ID"
    value = module.ecr_test.registry_id
}

output "ecr_region" {
    description = "ECR Region"
    value = module.ecr_test.region_ecr
}

output "ecr_endpoint" {
    description = "ECR Endpoint"
    value = module.ecr_test.registry_endpoint
}
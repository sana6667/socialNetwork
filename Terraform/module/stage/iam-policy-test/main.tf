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

module "iam_policy" {
    source = "../../iam-roles"
}

output "terraf_role" {
    description = "Github Terraform role"
    value = module.iam_policy.github_terraform_role_arn
}

output "github_deploy_role" {
    description = "Github deploy role"
    value = module.iam_policy.github_deploy_role_arn
}

output "oidc" {
    description = "OIDC"
    value = module.iam_policy.github_oidc_role_arn
}


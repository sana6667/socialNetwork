terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "6.0"
        }
    }
    
}


provider "aws" {
    region = "us-east-1"
}

module "s3_test" {
    source = "../../s3-tf-backend"
    conf_s3 = {
      backet_name = "sana-tf-name-test"
    }
}

output "s3_info" {
    value = module.s3_test.s3_info
    description = "Arn of the s3 bucket"
}

output "s3_mit" {
    value = module.s3_test.s3_id_nam
} 

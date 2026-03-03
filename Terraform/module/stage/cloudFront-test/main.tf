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

module "s3_cdn" {
    source = "../../s3-cdn"
    s3_cnd_conf_local = {
        bucket_name = "sana-sana-cdn-s3-test"
    }
}

module "cdn_test" {
    source = "../../cloudFront"
    conf_cloudFron = {
        provider_name = "aws"
        sub_dns_alb = "asoc.soc-net.lat"
        sub_dns = "app.soc-net.lat"
        dns_name = "soc-net.lat"
        cl_front_name = "cl-front-test"
        alb_monitoring_dns = "monitor.soc-net.lat"
    }
    s3_cdn_import = module.s3_cdn.s3_cdn_export
}

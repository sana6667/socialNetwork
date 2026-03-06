terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = ">= 5.60"
        }

    }
    backend "s3" {
      bucket = "cdn-buck-sana-556-ss"
      encrypt = true
      key = "global/s3/terraform.tfstate"
      dynamodb_table = "terraform-up-and-running-locks"
      region = "us-east-1"
    }
}

provider "aws" {
    region = "us-east-1"
}

module "network" {
    source = "../module/eks/data-panel/networks"
}


module "bastion" {
    source = "../module/bastion"
    pub_sub_bastion = module.network.subnet_id_bastion
    conf_net_export = module.network.network_conf_export
}

module "eks_cluster" {
    source = "../module/eks/control-panel"
    config_network_import = module.network.network_conf_export
    config_node_gr_value = module.workers_node.nodes_role_arn
}

module "workers_node" {
    source = "../module/eks/data-panel/workerNodes"
    conf_eks_import = module.eks_cluster.conf_eks_export
    conf_network_import = module.network.network_conf_export
}

module "rds" {
    source = "../module/rds"
    conf_network_import = module.network.network_conf_export
}

module "s3_cdn" {
    source = "../module/s3-cdn"
}

module "cloudFront" {
    source = "../module/cloudFront"
    s3_cdn_import = module.s3_cdn.s3_cdn_export
}

module "policy" {
    source = "../module/iam-roles"
}

module "ecr" {
    source = "../module/ecr"
}

module "terr_state_s3" {
    source = "../module/s3-tf-backend"
}

module "oidc_eks" {
    source = "../module/oidc-alb-controller"
    cluster_name = module.eks_cluster.conf_eks_export
    oidc_issued_url = module.eks_cluster.oidc_eks
    depends_on = [ module.eks_cluster ]
}

#module "dns_alb" {
 #   source = "../module/load-balancer"
#}

output "tf_s3_arn" {
    value = module.terr_state_s3.s3_id_nam
}

output "tf_s3_name" {
    value = module.terr_state_s3.tf_s3_name
}

output "tf_s3_info" {
    value = module.terr_state_s3.s3_info
}
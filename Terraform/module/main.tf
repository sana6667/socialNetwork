terraform {
    required_providers {
      aws = {
        source = "hashicorp/aws"
        version = ">= 5.64.0"
      }
    }
}

provider "aws" {
    region = "us-east-1"
}


module "network" {
    source = "./eks/data-panel/networks"
}


module "bastion" {
    source = "./bastion"
    pub_sub_bastion = module.network.subnet_id_bastion
    conf_net_export = module.network.network_conf_export
}

module "eks_cluster" {
    source = "./eks/control-panel"
    config_network_import = module.network.network_conf_export
    config_node_gr_value = module.workers_node.nodes_role_arn
}

module "workers_node" {
    source = "./eks/data-panel/workerNodes"
    conf_eks_import = module.eks_cluster.conf_eks_export
    conf_network_import = module.network.network_conf_export
}

module "rds" {
    source = "./rds"
    conf_network_import = module.network.network_conf_export
}

module "s3_cdn" {
    source = "./s3-cdn"
}

module "cloudFront" {
    source = "./cloudFront"
    s3_cdn_import = module.s3_cdn.s3_cdn_export
}

# module "policy" {
#     source = "./iam-roles"
# }

module "ecr" {
    source = "./ecr"
}

module "oidc_eks" {
    source = "./oidc-alb-controller"
    cluster_name = module.eks_cluster.conf_eks_export
    oidc_issued_url = module.eks_cluster.oidc_eks
    depends_on = [ module.eks_cluster ]
}
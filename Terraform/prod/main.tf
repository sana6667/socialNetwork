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


module "network" {
    source = "../module/eks/data-panel/networks"
}


module "bastion" {
    source = "../module/bastion"
    pub_sub_bastion = module.network.subnet_id_bastion
    conf_net_export = module.network.network_conf_export
    s3_bac_arn = module.aws_bac.s3_bac_arn
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
    waf_acl_arn = module.waf_acl.waf_arn
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

module "waf_acl" {
    source = "../module/waf"
}

/*
module "blob_storage" {
    source = "../module/storage-account"
}
*/


module "aws_bac" {
    source = "../module/aws_backups"
    con_str_value = module.blob_storage.con_str
    rds_id = module.rds.rds_id
    bastion_admin_id = module.bastion.bastion_admin_id
    

}

#module "dns_alb" {
 #  source = "../module/load-balancer"
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

output "waf_acl_arn" {
    value = module.waf_acl.waf_arn
}


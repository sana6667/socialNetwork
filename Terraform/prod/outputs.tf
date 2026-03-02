output "eks_cluster_name" {
  value = module.eks_cluster.conf_eks_export.cluster_eks_name
}

output "rds_endpoint" {
  value = module.rds.rds_export.endpoint
}

output "rds_port" {
  value = module.rds.rds_export.port
}

output "rds_db_name" {
  value = module.rds.rds_export.db_name
}

output "rds_username" {
  value = module.rds.rds_export.username
}

# Приватные подсети (EKS worker nodes)
output "private_subnets" {
  value = module.network.network_conf_export.sub_priv_value
}

# Роль нод (для aws-auth)
output "node_role_arn" {
  value = module.workers_node.nodes_role_arn
}

output "eks_oidc" {
  value = module.eks_cluster.oidc_eks
}

output "vpc_id" {
  description = "Vpc id"
  value = module.network.network_conf_export.vpc_id_value
}

output "pub_sub_ids" {
  description = "Public subnet ids"
  value = module.network.pub_sub_ids
}

output "ecr_endpoint" {
  description = "ECR Endpoint"
  value = module.ecr.registry_endpoint
}

output "ecr_url" {
  description = "ECR URL"
  value = module.ecr.conf_ecr_export
}

output "ecr_region" {
  description = "ECR Region"
  value = module.ecr.region_ecr
}

output "connection_string_rds" {
  description = "Connect RDS"
  value = module.rds.connection_string
}

output "cert_arn" {
  description = "Multi cert dns"
  value = module.cloudFront.cert_arn
}

output "tf_s3_cdn_bucket" {
    description = "Cdn s3 name"
    value = module.s3_cdn.tf_s3_cdn_bucket
}
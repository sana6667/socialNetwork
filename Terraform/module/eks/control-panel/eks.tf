resource "aws_eks_cluster" "eks_priv_endpoint" {
    name = var.config_eks["cluster_name"]
    version = var.config_eks["cluster_version"]
    role_arn = aws_iam_role.role_eks.arn
    vpc_config {
        subnet_ids = var.config_network_import.sub_priv_value
        endpoint_private_access = true
        endpoint_public_access = true
    }
    
    
    depends_on = [ aws_iam_role_policy_attachment.cluster_policy ]
}
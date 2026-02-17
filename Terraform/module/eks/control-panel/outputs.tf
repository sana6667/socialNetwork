output "conf_eks_export" {
    value = {
        cluster_eks_name = aws_eks_cluster.eks_priv_endpoint.name
        
    }
}

output "oidc_eks" {
    value = aws_eks_cluster.eks_priv_endpoint.identity[0].oidc[0].issuer
}
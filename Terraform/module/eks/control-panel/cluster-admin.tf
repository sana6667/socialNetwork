resource "aws_eks_access_entry" "user_access" {
  cluster_name  = aws_eks_cluster.eks_priv_endpoint.name
  principal_arn = "arn:aws:iam::336670698191:user/mycli"
  type          = "STANDARD"
  depends_on = [ aws_eks_cluster.eks_priv_endpoint ]
}

resource "aws_eks_access_policy_association" "user_admin" {
  depends_on = [
    aws_eks_cluster.eks_priv_endpoint,
    aws_eks_access_entry.user_access
  ]

  cluster_name  = aws_eks_cluster.eks_priv_endpoint.name
  policy_arn    = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy"
  principal_arn = aws_eks_access_entry.user_access.principal_arn

  access_scope {
    type = "cluster"
  }
}
variable "config_eks" {
    type = object({
      cluster_name = string
      cluster_version = string
      iam_role_name = string
    })
    default = {
        cluster_name = "priv-cluster-eks"
        cluster_version = "1.31"
        iam_role_name = "eks-cluster-role"
    }
}

variable "config_network_import" {
    type = object({
      sub_priv_value = list(string)
      vpc_id_value = string
    })
}

variable "config_node_gr_value" {
  type = string
}
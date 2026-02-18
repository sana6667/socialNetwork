variable "config_workers" {
    type = object({
       node_gr_name = string
       iam_role_name = string
       instance_typ_value = string
       label_value = string
    })
    default = {
        node_gr_name = "prod-node-gr"
        iam_role_name = "eks-node-role"
        instance_typ_value = "m7i-flex.large"
        label_value = "nodes"
    }
}

variable "conf_eks_import" {
    type = object({
        cluster_eks_name = string
    })
}

variable "conf_network_import" {
    type = object({
        sub_priv_value = list(string)
        vpc_id_value = string
    })
}
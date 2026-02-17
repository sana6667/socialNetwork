variable "cluster_name" {
    type = object({
      cluster_eks_name = string 
    })
}

variable "oidc_issued_url" {
    type = string
}

variable "namespace" {
    type = string
    default = "kube-system"
}

variable "service_account_name" {
    type = string
    default = "aws-load-balancer-controller"
}

variable "role_name" {
    type = string
    default = "alb-controller-role"
}

variable "policy_name" {
    type = string
    default = "AWSLoadBalancerControllerIAMPolicy"
}


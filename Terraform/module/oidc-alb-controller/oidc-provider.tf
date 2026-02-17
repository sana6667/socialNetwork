data "tls_certificate" "eks_oidc" {
    url = var.oidc_issued_url
}

resource "aws_iam_openid_connect_provider" "eks" {
    url = var.oidc_issued_url
    client_id_list = [ "sts.amazonaws.com" ]
    thumbprint_list = [ for c in data.tls_certificate.eks_oidc.certificates: c.sha1_fingerprint ]
}


locals {
  oidc_host = replace(aws_iam_openid_connect_provider.eks.url, "https://", "")
  sa_sub    = "system:serviceaccount:${var.namespace}:${var.service_account_name}"
}

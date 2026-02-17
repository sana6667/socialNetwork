resource "aws_iam_role" "alb_controller" {
    name = var.role_name
    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [{
            Effect = "Allow",
            Action = "sts:AssumeRoleWithWebIdentity",
            Principal = {
                Federated = aws_iam_openid_connect_provider.eks.arn
            },
            Condition = {
                StringEquals = {
                    "${local.oidc_host}:aut" = "sts.amazonaws.com",
                    "${local.oidc_host}:sub" = local.sa_sub
                }
            }
        }]
    })
    depends_on = [ aws_iam_openid_connect_provider.eks ]
}

resource "aws_iam_policy" "lbc" {
    name = var.policy_name
    policy = file("${path.module}/iam_policy.json")
    description = "Official AWS Load Balancer Controller policy (customer-managed copy)"
}

resource "aws_iam_role_policy_attachment" "attach" {
    role = aws_iam_role.alb_controller.name
    policy_arn = aws_iam_policy.lbc.arn
}
resource "aws_iam_role" "github_deploy" {
    name = "github-deploy-role"
    assume_role_policy = jsonencode({
        Version = "2012-10-17",
        Statement = [
            {
                Effect = "Allow",
                Principal = {
                    Federated = aws_iam_openid_connect_provider.git_hub.arn
                },
                Action = "sts:AssumeRoleWithWebIdentity",
                Condition = {
                    StringEquals = {
                        "token.actions.githubusercontent.com:sub": "repo:sana6667/socialNetwork:ref:refs/heads/main"
                    }
                }
            }
        ]
    })
}

resource "aws_iam_policy" "deploy_policy" {
    name = "github-deploy-policy"
    description = "Minimal CI/CD policy for Kubernetes deploy"
    policy = jsonencode({
        Version = "2012-10-17",
        Statement = [
            {
                Effect = "Allow",
                Action = [
                    "ecr:GetAuthorizationToken",
                    "ecr:BatchCheckLayerAvailability",
                    "ecr:BatchGetImage",
                    "ecr:CompleteLayerUpload",
                    "ecr:GetDownloadUrlForLayer",
                    "ecr:InitiateLayerUpload",
                    "ecr:PutImage",
                    "ecr:UploadLayerPart"
                ],
                Resource = "*"
            },
            {
                Effect = "Allow",
                Action = [
                    "eks:DescribeCluster",
                    "eks:ListClusters"
                ],
                Resource = "*"
            },
            {
                Effect = "Allow",
                Action = [
                    "cloudfront:CreateInvalidation",
                    "cloudfront:GetDistribution",
                    "cloudfront:GetDistributionConfig"
                ],
                Resource = "*"
            }
        ]
    })
}

resource "aws_iam_role_policy_attachment" "deploy_attach" {
    role = aws_iam_role.github_deploy.name
    policy_arn = aws_iam_policy.deploy_policy.arn
}
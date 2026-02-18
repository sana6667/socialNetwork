resource "aws_iam_role" "github_terraform" {
    name = "github-terraform-role"
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

resource "aws_iam_policy" "terraform_full_access" {
    name = "terraform-full-access-policy"
    description = "Temporary wide policy for Terraform CI until hardened"
    policy = jsonencode({
        Version = "2012-10-17",
        Statement = [
            {
                Effect = "Allow",
                Action = "*",
                Resource = "*"
            }
        ]
    })
}

resource "aws_iam_role_policy_attachment" "terraform_attach" {
    policy_arn = aws_iam_policy.terraform_full_access.arn
    role = aws_iam_role.github_terraform.name
}
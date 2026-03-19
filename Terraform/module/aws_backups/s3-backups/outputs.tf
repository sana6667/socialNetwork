output "lambda_role_ec2" {
    description = "Aws labmda role ec2"
    value = aws_iam_role.lambda_role_ec2.arn
}

output "labmda_role_rds" {
    description = "Aws lambda role rds"
    value = aws_iam_role.lambda_role_rds.arn
}
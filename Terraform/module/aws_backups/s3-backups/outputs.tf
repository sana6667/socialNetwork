output "lambda_role_ec2" {
    description = "Aws labmda role ec2"
    value = aws_iam_role.lambda_role_ec2.arn
}

output "lambda_role_rds" {
    description = "Aws lambda role rds"
    value = aws_iam_role.lambda_role_rds.arn
}

output "lambda_role_upload" {
    description = "Aws lambda upload to azure"
    value = aws_iam_role.lambda_role_upload.arn
}

output "s3_backup_name" {
    description = "Aws s3 backup name"
    value = aws_s3_bucket.backup_s3_diplom.bucket
}

output "s3_backup_arn" {
    value = aws_s3_bucket.backup_s3_diplom.arn
}
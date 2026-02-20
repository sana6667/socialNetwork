output "s3_info" {
    value = aws_s3_bucket.my_s3.arn
    description = "Arn of the s3 bucket"
}

output "s3_id_nam" {
    value = aws_s3_bucket.my_s3.id
}

output "tf_s3_name" {
    value = aws_s3_bucket.my_s3.bucket
}


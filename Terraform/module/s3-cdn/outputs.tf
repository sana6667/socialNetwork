output "s3_cdn_export" {
    value = {
        s3_cdn_name = aws_s3_bucket.s3_cdn.bucket_regional_domain_name
        s3_cdn_id_value = aws_s3_bucket.s3_cdn.id
        s3_arn_value = aws_s3_bucket.s3_cdn.arn
    }
}

output "tf_s3_cdn_bucket" {
    value = aws_s3_bucket.s3_cdn.bucket
}
resource "aws_s3_bucket" "s3_cdn" {
    bucket = var.s3_cnd_conf_local.bucket_name
    tags = {
        name = "s3-cdn"
    }
}

resource "aws_s3_bucket_versioning" "cdn_s3_vers" {
    bucket = aws_s3_bucket.s3_cdn.id
    versioning_configuration {
        status = "Enabled"
    }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "cdn_encrypt" {
    bucket = aws_s3_bucket.s3_cdn.id
    rule {
        apply_server_side_encryption_by_default {
          sse_algorithm = "AES256"
        }
    }
}

resource "aws_s3_bucket_public_access_block" "block_s3_cdn" {
    bucket = aws_s3_bucket.s3_cdn.id
    block_public_acls = true
    ignore_public_acls = true
    block_public_policy = true
    restrict_public_buckets = true
}
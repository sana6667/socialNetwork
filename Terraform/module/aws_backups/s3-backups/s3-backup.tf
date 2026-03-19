resource "aws_s3_bucket" "backup_s3_diplom" {
    bucket = var.s3_backup_name
    region = var.s3_backups_region
    tags = {
        name = "backup-s3-diplom"
    }
}

resource "aws_s3_bucket_acl" "backup_acl" {
    bucket = aws_s3_bucket.backup_s3_diplom.bucket
    acl = "private"
}

resource "aws_s3_bucket_versioning" "backup_versioning" {
    bucket = aws_s3_bucket.backup_s3_diplom.bucket
    versioning_configuration {
        status = "Enable"
    }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "backup_encrypt" {
    bucket = aws_s3_bucket.backup_s3_diplom.bucket
    rule {
        apply_server_side_encryption_by_default {
          sse_algorithm = "AES-256"
        }
    }
}

resource "aws_s3_bucket_public_access_block" "backup_pub_block" {
    bucket = aws_s3_bucket.backup_s3_diplom.id
    block_public_acls = true
    block_public_policy = true
    ignore_public_acls = true
    restrict_public_buckets = true
}
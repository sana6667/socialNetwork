resource "aws_s3_bucket" "my_s3" {
    bucket = var.conf_s3.backet_name
    tags = {
        name = "back-tf-backent"
    }
}

resource "aws_s3_bucket_versioning" "enable_verion" {
    bucket = aws_s3_bucket.my_s3.id
    versioning_configuration {
        status = "Enabled"
    }
    
} 

resource "aws_s3_bucket_server_side_encryption_configuration" "defaul_encrypt" {
    bucket = aws_s3_bucket.my_s3.id
    rule {
        apply_server_side_encryption_by_default {
          sse_algorithm = "AES256"
        }
    }
}

resource "aws_s3_bucket_public_access_block" "pub_block_s3" {
    bucket = aws_s3_bucket.my_s3.id
    block_public_acls = true
    block_public_policy = true
    ignore_public_acls = true
    restrict_public_buckets = true
}

#DYNAMO_DB_TABLE
resource "aws_dynamodb_table" "terraform-s3" {
    name = "terraform-up-and-running-locks"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "LockID"
    attribute {
        name = "LockID"
        type = "S"
    }
}
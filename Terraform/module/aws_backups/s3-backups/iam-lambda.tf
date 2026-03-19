resource "aws_iam_role" "lambda_role_upload" {
    name = var.lambda_role_policy_upload
    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [{
            Action = "sts:AssumeRole"
            Effect = "Allow"
            Principal = {
                Service = "lambda.amazonaws.com"
            }
        }]
    })
}

resource "aws_iam_role" "lambda_role_ec2" {
    name = var.lambda_role_ec2
    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [{
            Action = "sts:AssumeRole"
            Effect = "Allow"
            Principal = {
            Service = "lambda.amazonaws.com"
            }
        }]
    })
}

resource "aws_iam_role" "lambda_role_rds" {
    name = var.lambda_role_rds
    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [{
            Action = "sts:AssumeRole"
            Effect = "Allow"
            Principal = {
                Service = "lambda.amazonaws.com"
            }
        }]
    })
}



resource "aws_iam_role_policy" "lambda_role_policy_s3" {
    name = var.lambda_role_policy_upload
    role = aws_iam_role.lambda_role_upload.id
    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Action = [
                    "logs:CreateLogGroup",
                    "logs:CreateLogStream",
                    "logs:PutLogEvents"
                ]
                Effect = "Allow"
                Resource = "*"
            },
            {
                Action = [
                    "s3:ListBucket",
                    "s3:GetObject",
                    "s3:PutObject",
                    "s3:DeleteObject"
                ]
                Effect = "Allow"
                Resource = [
                    aws_s3_bucket.backup_s3_diplom.arn,
                    "${aws_s3_bucket.backup_s3_diplom.arn}/*"
                ]
            }
        ]
    })
}

resource "aws_iam_role_policy" "lambda_pole_policy_ec2" {
    name = var.lambda_role_policy_ec2
    role = aws_iam_role.lambda_role_ec2.id
    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
             {
                Action = [
                    "logs:CreateLogGroup",
                    "logs:CreateLogStream",
                    "logs:PutLogEvents"
                ]
                Effect = "Allow"
                Resource = "*"
            },
            {
                Action = [
                    "ec2:CreateSnapshot",
                    "ec2:DescribeInstances",
                ]
                Resource = "*"
                Effect = "Allow"
            }
        ]
    })
}

resource "aws_iam_role_policy" "lambda_role_policy_rds" {
    name = var.lambda_role_policy_rds
    role = aws_iam_role.lambda_role_rds.id
    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
             {
                Action = [
                    "logs:CreateLogGroup",
                    "logs:CreateLogStream",
                    "logs:PutLogEvents"
                ]
                Effect = "Allow"
                Resource = "*"
            },
            {
                Action = [
                    "rds:CreateDBSnapshot",
                    "rds:DescribeDBSnapshots",
                    "rds:DescribeDBInstances"
                    
                ]
                Resource = "*"
                Effect = "Allow"
            },
            {
                Action = [
                    "s3:PutObject",
                    "s3:ListBucket"
                ]
                Effect = "Allow"
                Resource = [
                    aws_s3_bucket.backup_s3_diplom.arn,
                    "${aws_s3_bucket.backup_s3_diplom.arn}/*"
                ]
            },
            {
                Action = ["iam:PassRole"]
                Effect = "Allow"
                Resource = "*"
            }
        ]
    })
}


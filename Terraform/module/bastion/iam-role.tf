resource "aws_iam_role" "admin_ec2_role" {
    name = "admin-ec2-role"
    assume_role_policy = jsonencode({
        Version = "2012-10-17",
        Statement = [{
            Effect = "Allow",
            Action = "sts:AssumeRole",
            Principal = {
                Service = "ec2.amazonaws.com"
            }
        }]
    })
}

resource "aws_iam_role_policy" "admin_ec2_s3_policy" {
    name = "admin-ec2-s3-policy"
    role = aws_iam_role.admin_ec2_role.id
    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Effect = "Allow",
                Action = [
                    
                    "s3:PutObject",
                    "s3:GetObject",
                    "s3:ListBucket"

                ],
                Resource = [
                    var.s3_bac_arn,
                    "${var.s3_bac_arn}/*"
                ]

            }
        ]
    })
}

resource "aws_iam_instance_profile" "admin_ec2_profile" {
    name = "admin-ec2-profile"
    role = aws_iam_role.admin_ec2_role.name
}
output "conf_ecr_export" {
    value = aws_ecr_repository.my_ecr.repository_url
}

output "registry_id" {
    value = aws_ecr_repository.my_ecr.id
    description = "ECR ID"
}

output "region_ecr" {
    value = "us-east-1"
    description = "ECR Region"
}


output "registry_endpoint" {
  description = "ECR registry endpoint (host without repo path)"
  value       = replace(aws_ecr_repository.my_ecr.repository_url, "/${aws_ecr_repository.my_ecr.name}", "")
}

output "ecr_name" {
    value = aws_ecr_repository.my_ecr.name
}

output "ecr_arn" {
    description = "ECR ARN"
    value = aws_ecr_repository.my_ecr.arn
}
resource "aws_ecr_repository" "my_ecr" {
    name = var.conf_ecr.ecr_name
    image_tag_mutability = "IMMUTABLE"
    image_scanning_configuration  { scan_on_push = true }
    encryption_configuration {
        encryption_type = "AES256"
    }
    tags = {
        Project = "diploma"
    }
    force_delete = true
}

resource "aws_ecr_lifecycle_policy" "my_ecr_policy" {
    repository = aws_ecr_repository.my_ecr.name
    policy = <<JSON
    {
        "rules": [
            {
                "rulePriority": 1,
                "description": "Keep last 10 images",
                "selection": {"tagStatus":"any", "countType": "imageCountMoreThan",
                "countNumber": 10},
                "action": { "type": "expire"}
            }
        ]
    }
    JSON
}

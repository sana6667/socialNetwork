terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~>5.60"
        }
    }
}

provider "aws" {
    region = "us-east-1"
}

locals {
    admin_pass = "7bKtHqfhlzNLM304WeK1"
}

data "aws_vpc" "def_vpc" {
    default = true
}

resource "aws_security_group" "mysql_sg" {
    name = "mysql-sg-test"
    vpc_id = data.aws_vpc.def_vpc.id
    ingress {
        from_port = 1433
        to_port = 1433
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_db_instance" "my_rds_mysql" {
    identifier = "mymssql"
    allocated_storage = 20
    engine = "sqlserver-ex"
    engine_version = "15.00.4236.7.v1"
    instance_class = "db.t3.micro"
    max_allocated_storage = 20
    vpc_security_group_ids = [ aws_security_group.mysql_sg.id ]
    username = "sana"
    password = local.admin_pass
    storage_type = "gp2"
    multi_az = false
    publicly_accessible = false
    skip_final_snapshot = true
    deletion_protection = false
}

output "rds_enpoint" {
    value = aws_db_instance.my_rds_mysql.address
}

output "connection_string" {
  value = "Server=${aws_db_instance.my_rds_mysql.address},1433;Database=SocialNetworkDb;User Id=sana;Password=${local.admin_pass};Encrypt=False;TrustServerCertificate=True;"
}

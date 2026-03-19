locals {
    admin_passwd = "7bKtHqfhlzNLM304WeK1"
    
}

resource "aws_db_subnet_group" "db_sg" {
    subnet_ids = var.conf_network_import.sub_priv_value
    name = "dg-sg"
    description = "db subnet subnet group"
}


resource "aws_db_instance" "rds" {
    identifier = "my-mysql"
    allocated_storage = 20
    instance_class = "db.t3.micro"
    engine = "sqlserver-ex"
    engine_version = "15.00.4236.7.v1"
    username = "admin"
    password = local.admin_passwd
    max_allocated_storage = 20
    db_subnet_group_name = aws_db_subnet_group.db_sg.name
    vpc_security_group_ids = [aws_security_group.db_sg.id]
    storage_type = "gp2"
    publicly_accessible = false
    multi_az = false
    skip_final_snapshot = true
    deletion_protection = false
    
    tags = {
        name = "ms-sql-ser"
    }
}
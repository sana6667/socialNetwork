resource "aws_security_group" "db_sg" {
    name = "db-mysql-sg"
    vpc_id = var.conf_network_import.vpc_id_value
    ingress {
        from_port = 1433
        to_port = 1433
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

}
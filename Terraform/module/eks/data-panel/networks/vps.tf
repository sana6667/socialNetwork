resource "aws_vpc" "vpc_data_panel" {
    cidr_block = var.vpc_config["cidr"]
    enable_dns_hostnames = true
    enable_dns_support = true
    tags = {
        name = var.vpc_config["name"]
    }
}
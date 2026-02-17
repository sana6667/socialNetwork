resource "aws_eip" "my_eip" {
    domain = "vpc"
    depends_on = [ aws_internet_gateway.igw_data_panel ]
}

resource "aws_nat_gateway" "my_nat" {
    subnet_id = aws_subnet.pub_sub[0].id
    allocation_id = aws_eip.my_eip.allocation_id
    tags = {
        name = var.vpc_config["nat_name"]
    }
}
resource "aws_route_table" "pub_rt" {
    vpc_id = aws_vpc.vpc_data_panel.id
    route {
        cidr_block = var.vpc_config["default_route"]
        gateway_id = aws_internet_gateway.igw_data_panel.id
    }
    depends_on = [aws_internet_gateway.igw_data_panel]
    tags = {
        name = "pub-rt"
    }
}

resource "aws_route_table_association" "pub_rt_assoc" {
    count = length(var.vpc_config.pub_sub)
    subnet_id = aws_subnet.pub_sub[count.index].id
    route_table_id = aws_route_table.pub_rt.id
}
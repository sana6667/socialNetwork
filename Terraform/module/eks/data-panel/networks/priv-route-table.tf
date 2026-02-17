resource "aws_route_table" "priv_rt" {
    vpc_id = aws_vpc.vpc_data_panel.id
    route {
        cidr_block = var.vpc_config["default_route"]
        nat_gateway_id = aws_nat_gateway.my_nat.id
    }
    depends_on = [aws_nat_gateway.my_nat]
    tags = {
        name = "priv-rt"
    }
}

resource "aws_route_table_association" "priv_rt_assoc" {
    count = length(var.vpc_config.private_sub)
    subnet_id = aws_subnet.priv_sub[count.index].id
    route_table_id = aws_route_table.priv_rt.id
}
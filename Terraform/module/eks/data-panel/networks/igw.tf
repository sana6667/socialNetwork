resource "aws_internet_gateway" "igw_data_panel" {
    vpc_id = aws_vpc.vpc_data_panel.id
    tags = {
        name = "igw-data-panel"
    }
}
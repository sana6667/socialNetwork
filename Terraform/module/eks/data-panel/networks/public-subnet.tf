resource "aws_subnet" "pub_sub" {
    count = length(var.vpc_config["pub_sub"])
    vpc_id = aws_vpc.vpc_data_panel.id
    cidr_block = var.vpc_config["pub_sub"][count.index]
    availability_zone = var.vpc_config["asz_value"][count.index]
    map_public_ip_on_launch = true
    tags = {
        name = "pub-sub-${count.index}"
        "kubernetes.io/role/elb" = 1
        "kubernetes.io/cluster/priv-cluster-eks" = "shared"

    }
}
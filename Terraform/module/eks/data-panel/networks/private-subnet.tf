resource "aws_subnet" "priv_sub" {
    count = length(var.vpc_config["private_sub"])
    vpc_id = aws_vpc.vpc_data_panel.id
    cidr_block = var.vpc_config["private_sub"][count.index]
    availability_zone = var.vpc_config["asz_value"][count.index]
    map_public_ip_on_launch = false
    tags = {
        name = "priv-sub-${count.index}"
        # если когда‑то захочешь internal ALB
        "kubernetes.io/role/internal-elb" = 1

        # ОБЯЗАТЕЛЬНО ВСЕГДА
        "kubernetes.io/cluster/priv-cluster-eks" = "shared"

    }
}
output "subnet_id_bastion" {
    value = aws_subnet.pub_sub[0].id
}

output "network_conf_export" {
    value = {
        sub_priv_value =aws_subnet.priv_sub[*].id
        vpc_id_value = aws_vpc.vpc_data_panel.id
    }
}
output "pub_sub_ids" {
    value = aws_subnet.pub_sub[*].id
}


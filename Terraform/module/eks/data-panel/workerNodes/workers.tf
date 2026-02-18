resource "aws_eks_node_group" "node_gr" {
    cluster_name = var.conf_eks_import["cluster_eks_name"]
    node_group_name = var.config_workers["node_gr_name"]
    node_role_arn = aws_iam_role.nodes_gr.arn
    instance_types = [var.config_workers.instance_typ_value]
    subnet_ids = var.conf_network_import.sub_priv_value
    scaling_config {
        desired_size = 1
        max_size = 2
        min_size = 1
    }
    update_config {
        max_unavailable = 1
    }
    labels = {
        name = var.config_workers.label_value
    }
    depends_on = [ 
        aws_iam_role_policy_attachment.amazon_ec2_container_registry_read_only,
        aws_iam_role_policy_attachment.amazon_eks_cni_policy,
        aws_iam_role_policy_attachment.amazon_eks_worker_node_policy,
        aws_iam_role_policy_attachment.amazon_ssm_managed_instance_core
     ]
}
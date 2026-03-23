variable "pub_sub_bastion" {
    type = string
}

variable "conf_bastion_host" {
    type = object({
      path_ssh_key = string
      family_ec2_instance = string 
      name_sg_bastion = string
    })
    default = {
        path_ssh_key = "C:/Users/shupt/.ssh/bastion.pub"
        family_ec2_instance = "t3.micro"
        name_sg_bastion = "bastion-sg"
    }
}

variable "conf_net_export" {
    type = object({
        sub_priv_value = list(string)
        vpc_id_value = string
    })
}

variable "s3_bac_arn" {
    type = string
}


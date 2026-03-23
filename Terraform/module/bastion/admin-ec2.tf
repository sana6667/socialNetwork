data "aws_ami" "ubuntu" {
    filter {
        name = "name"
        values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
    }
    filter {
        name = "virtualization-type"
        values = ["hvm"]
    }
    owners = ["099720109477"]
    most_recent = true
}


resource "aws_instance" "bastion_host" {
    ami = data.aws_ami.ubuntu.id
    subnet_id = var.pub_sub_bastion
    key_name = aws_key_pair.my_ssh_key.key_name
    instance_type = var.conf_bastion_host.family_ec2_instance
    associate_public_ip_address = true
    vpc_security_group_ids = [ aws_security_group.bastion_sg.id ]
    tags = {
        name = "bastion-host-admin"
    }
    iam_instance_profile = aws_iam_instance_profile.admin_ec2_profile.name

}
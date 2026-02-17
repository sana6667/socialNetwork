resource "aws_key_pair" "my_ssh_key" {
    key_name = "bastion-ssh-key"
    public_key = file("${path.module}/bastion.pub")
    tags = {
        name = "baction-admin-key-ssh"
    }
}
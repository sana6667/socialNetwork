output "rds_export" {
  description = "Conect"
  value = {
    endpoint = aws_db_instance.rds.address
    port     = aws_db_instance.rds.port
    db_name  = aws_db_instance.rds.db_name
    username = aws_db_instance.rds.username
  }
}

output "connection_string" {
  value = "Server=${aws_db_instance.rds.address},1433;Database=SocialNetworkDb;User Id=sana;Password=${local.admin_passwd};Encrypt=False;TrustServerCertificate=True;"
}


output "rds_id" {
  value = aws_db_instance.rds.id
}
data "aws_db_instances" "backup_rds" {
    filter {
        name = "tag:name"
        values = ["ms-sql-ser"]
    }
}

resource "aws_lambda_function" "lambda_rds_snapshot" {
    function_name = var.lambda_rds_fun_name
    role = var.lambda_rds_role_name
    handler = "rds_snapshot.rds_handler"
    runtime = "python3.12"

    filename = "${module.path}/rds_snapshot.zip"
    source_code_hash = base64sha256("${path.module}/rds_snapshot.zip")

    environment {
        variables = {
            DB_IDENTIFIER = data.aws_db_instances.backup_rds.id
        }
    }
}

resource "aws_cloudwatch_event_rule" "rds_event_rule" {
    name = var.cloud_watch_rule_name
    description = "Daily RDS MSSQL snapshot"
    schedule_expression = "cron(0 2 * * ? *)"
}

resource "aws_cloudwatch_event_target" "triger_rds" {
    rule = aws_cloudwatch_event_rule.rds_event_rule.name
    arn = aws_lambda_function.lambda_rds_snapshot.arn
}

resource "aws_lambda_permission" "allow_rds_snapshot" {
    action = "lambda:InvokeFunction"
    function_name = aws_lambda_function.lambda_rds_snapshot.function_name
    principal = "events.amazonaws.com"
    source_arn = aws_cloudwatch_event_rule.rds_event_rule.arn
    
}
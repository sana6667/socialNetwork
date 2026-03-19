data "aws_instances" "admin_ec2" {
    filter {
        name = "tag:name"
        values = ["bastion-host-admin"]
    }
} 

resource "aws_lambda_function" "ec2_snapshot_lambda" {
    function_name = var.ec2_snapshon_lambda_name
    role = var.lambda_role_ec2_arn
    handler = "lambda_function.lambda_handler"
    runtime = "python3.12"

    filename = "${path.module}/ec2_snapshot.zip"
    source_code_hash = filebase64sha256("${path.module}/ec2_snapshot.zip")

    environment {
        variables = {
            INSTANCE_ID = data.aws_instances.admin_ec2.id
        }
    }
}


resource "aws_cloudwatch_event_rule" "ec2_snapshot_daily" {
    name = var.cloud_watch_rule
    description = "Daily EC2 snapshot"
    schedule_expression = "cron(0 3 * * ? *)"
}

resource "aws_lambda_permission" "eventbridge_permission_ec2" {
    action = "lambda:InvokeFunction"
    function_name = aws_lambda_function.ec2_snapshot_lambda.function_name
    principal = "events.amazonaws.com"
    source_arn = aws_cloudwatch_event_rule.ec2_snapshot_daily.arn
}

resource "aws_cloudwatch_event_target" "ec2_snapshot_trigger" {
    rule = aws_cloudwatch_event_rule.ec2_snapshot_daily.name
    arn = aws_lambda_function.ec2_snapshot_lambda.arn
}
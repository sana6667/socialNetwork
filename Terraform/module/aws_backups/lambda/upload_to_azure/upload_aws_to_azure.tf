resource "aws_lambda_function" "lambda_upload_to_azure" {
    function_name = var.labmda_upload_name
    role = var.lambda_role_upload_arn
    handler = "upload_to_azure.lambda_handler"
    runtime = "python3.12"

    filename = "${path.module}/upload_to_azure.zip"
    source_code_hash = filebase64("${path.module}/upload_to_azure.zip")

    environment {
        variables = {
            S3_BUCKET = var.s3_backup_name_value
            AZURE_CONTAINER = var.stor_account_import.container_name
            AZURE_SAS_TOKEN = var.sas_token_value
            AZURE_ACCOUNT = var.stor_account_import.stor_account_name
        }
    }
}

resource "aws_s3_bucket_notification" "trigger_upload" {
  bucket = var.s3_backup_name_value

  lambda_function {
    lambda_function_arn = aws_lambda_function.lambda_upload_to_azure.arn
    events              = ["s3:ObjectCreated:*"]
  }
}

resource "aws_lambda_permission" "allow_s3" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_upload_to_azure.function_name
  principal     = "s3.amazonaws.com"
  source_arn    = "arn:aws:s3:::${var.s3_backup_name_value}"
}
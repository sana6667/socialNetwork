import boto3
import os
from datetime import datetime

rds = boto3.client("rds")

def lambda_handler(event, context):
    # Получаем идентификатор базы из переменных окружения Lambda
    db_identifier = os.environ["DB_IDENTIFIER"]

    # Генерируем уникальный snapshot ID
    timestamp = datetime.utcnow().strftime("%Y-%m-%d-%H-%M-%S")
    snapshot_id = f"{db_identifier}-snapshot-{timestamp}"

    # Создаем snapshot MSSQL
    try:
        response = rds.create_db_snapshot(
            DBSnapshotIdentifier=snapshot_id,
            DBInstanceIdentifier=db_identifier,
            Tags=[
                {"Key": "CreatedBy", "Value": "LambdaBackup"},
                {"Key": "Type", "Value": "RDS-MSSQL-Snapshot"}
            ]
        )
        return {
            "status": "success",
            "snapshot_id": snapshot_id,
            "response": str(response)
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

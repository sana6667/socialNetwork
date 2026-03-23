import boto3
import os
import urllib.request
from urllib.parse import quote

s3 = boto3.client("s3")

def lambda_handler(event, context):
    bucket = os.environ["S3_BUCKET"]
    container = os.environ["AZURE_CONTAINER"]
    sas_token = os.environ["AZURE_SAS_TOKEN"]
    account = os.environ["AZURE_ACCOUNT"]

    # Если это S3-trigger (как и нужно)
    if "Records" in event:
        for record in event["Records"]:
            key = record["s3"]["object"]["key"]

            # Локальный путь /tmp
            temp_path = f"/tmp/{key.split('/')[-1]}"

            # Скачиваем файл из S3
            s3.download_file(bucket, key, temp_path)

            # Azure Blob URL
            blob_name = quote(key)
            url = f"https://{account}.blob.core.windows.net/{container}/{blob_name}?{sas_token}"

            # Читаем файл
            with open(temp_path, "rb") as file_data:
                data = file_data.read()

            # Готовим PUT‑запрос через urllib
            req = urllib.request.Request(
                url,
                data=data,
                method="PUT",
                headers={
                    "x-ms-blob-type": "BlockBlob"
                }
            )

            # Делаем запрос
            try:
                response = urllib.request.urlopen(req)
                status = response.getcode()
            except Exception as e:
                return {
                    "status": "error",
                    "message": str(e)
                }

            return {
                "status": "uploaded",
                "key": key,
                "azure_response": status
            }

    return {"status": "no_records"}
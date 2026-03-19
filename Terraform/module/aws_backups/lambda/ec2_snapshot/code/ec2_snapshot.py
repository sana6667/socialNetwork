import boto3
import os
from datetime import datetime

ec2 = boto3.client("ec2")

def lambda_handler(event, context):
    instance_id = os.environ["INSTANCE_ID"]
    date_str = datetime.utcnow().strftime("%Y-%m-%d-%H-%M-%S")

    # Получаем volume IDs
    reservations = ec2.describe_instances(InstanceIds=[instance_id])
    volumes = reservations["Reservations"][0]["Instances"][0]["BlockDeviceMappings"]

    for vol in volumes:
        volume_id = vol["Ebs"]["VolumeId"]

        ec2.create_snapshot(
            VolumeId=volume_id,
            Description=f"AutoSnapshot-{instance_id}-{date_str}",
            TagSpecifications=[
                {
                    "ResourceType": "snapshot",
                    "Tags": [
                        {"Key": "Name", "Value": f"ec2-backup-{instance_id}"},
                        {"Key": "CreatedBy", "Value": "LambdaBackup"}
                    ]
                }
            ]
        )

    return {"status": "ok"}
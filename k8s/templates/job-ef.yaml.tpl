apiVersion: batch/v1
kind: Job
metadata:
  name: ef-migrations
  namespace: default
spec:
  backoffLimit: 1
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: migrator
          image: ${ECR_URL}:migrator-${{ github.sha }}
          env:
            - name: ConnectionStrings__DefaultConnection
              valueFrom:
                secretKeyRef:
                  name: mssql-conn
                  key: ConnectionStrings__DefaultConnection
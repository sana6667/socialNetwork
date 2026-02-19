apiVersion: batch/v1
kind: Job
metadata:
  name: ef-migrations
  namespace: default
spec:
  backoffLimit: 1
  template:
    spec:
      containers:
        - name: migrator
          image: ${ECR_URL}:migrator-latest
          envFrom:
            - secretRef:
                name: mssql-conn

          command: ["dotnet"]
          args:
            [
              "ef", "database", "update",
              "--project", "../SocialNetwork.Infrastructure",
              "--startup-project", "."
            ]
      restartPolicy: Never
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-deploy
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels: { app: backend }
  template:
    metadata:
      labels: { app: backend }
    spec:
      containers:
        - name: backend
          image: ${ECR_URL}:latest
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 80
          env:
            - name: ASPNETCORE_ENVIRONMENT
              value: "Development"
          # Если Kestrel не слушает 80 - раскомментируй:
          # env:
          #   - { name: ASPNETCORE_URLS, value: "http://0.0.0.0:80" }
            - name: ConnectionStrings__DefaultConnection
              valueFrom:
                secretKeyRef:
                  name: mssql-conn
                  key: ConnectionStrings__DefaultConnection
          readinessProbe:
            httpGet: { path: /swagger/index.html, port: 80 }
            initialDelaySeconds: 10
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 6

          livenessProbe:
            httpGet: { path: /swagger/index.html, port: 80 }
            initialDelaySeconds: 30
            periodSeconds: 10
            timeoutSeconds: 3
            failureThreshold: 6
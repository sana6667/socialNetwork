apiVersion: apps/v1
kind: Deployment
metadata:
  name: spam-detec
  namespace: default

spec:
  replicas: 1
  selector:
    matchLabels:
      app: spam-detec
  template:
    metadata:
      labels:
        app: spam-detec
    spec:
      containers:
        - name: spam-detec
          image: "${ECR_URL}:spam-detec-${IMAGE_TAG}"
          ports:
            - containerPort: 8000

          readinessProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 10
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 6

          livenessProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 30
            periodSeconds: 10
            timeoutSeconds: 3
            failureThreshold: 6
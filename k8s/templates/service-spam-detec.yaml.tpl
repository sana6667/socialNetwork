apiVersion: v1
kind: Service
metadata:
    name: ser-spam-detec
    namespace: default

spec:
    type: ClusterIP
    selector: { app: spam-detec }
    ports:
        - name: http
          port: 8000
          targetPort: 8000

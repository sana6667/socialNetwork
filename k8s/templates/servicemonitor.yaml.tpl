apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: socialnetwork-monitor
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: backend
  namespaceSelector:
    matchNames:
      - default
  endpoints:
    - port: http
      path: /metrics
      interval: 15s
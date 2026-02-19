grafana:
  adminPassword: ${GRAFANA_PASS}  # лучше вынести в секреты GitHub
  service:
    type: ClusterIP
    port: 80
  ingress:
    enabled: false  # Мы используем ALB Ingress отдельно

prometheus:
  service:
    type: ClusterIP

alertmanager:
  enabled: true

# Чтобы Grafana и Prometheus были видны через Ingress

  
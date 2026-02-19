apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: grafana-ingress
  namespace: monitoring
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/backend-protocol: HTTP

    # FIX health check (обязательно!)
    alb.ingress.kubernetes.io/healthcheck-path: /api/health
    alb.ingress.kubernetes.io/healthcheck-port: traffic-port
    alb.ingress.kubernetes.io/success-codes: "200"

    
# Листенеры + редирект 80 -> 443
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTPS":443},{"HTTP":80}]'
    alb.ingress.kubernetes.io/actions.ssl-redirect: >
      {"Type":"redirect","RedirectConfig":{"Protocol":"HTTPS","Port":"443","StatusCode":"HTTP_301"}}

    # Сертификат ACM из Terraform (tpl-переменная)
    alb.ingress.kubernetes.io/certificate-arn: ${CERT_ARN}


spec:
  rules:
    - host: monitor.soc-net.lat    # убедись что DNS уже правильный!
      http:
        paths:
          
          # редирект с 80 на 443
          - path: /
            pathType: Prefix
            backend:
              service:
                name: ssl-redirect
                port:
                  name: use-annotation



          - path: /
            pathType: Prefix
            backend:
              service:
                name: monitoring-grafana    # ← правильное имя!
                port:
                  number: 80
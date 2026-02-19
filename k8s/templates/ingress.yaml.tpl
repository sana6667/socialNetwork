apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: backend
  namespace: default
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/backend-protocol: HTTP

    # HEALTHCHECK — обязательно!
    alb.ingress.kubernetes.io/healthcheck-path: /
    alb.ingress.kubernetes.io/success-codes: "200,302"
    alb.ingress.kubernetes.io/healthcheck-port: traffic-port

    
# Включаем оба листенера и действие редиректа 80 -> 443
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTPS":443},{"HTTP":80}]'
    alb.ingress.kubernetes.io/actions.ssl-redirect: >
      {"Type":"redirect","RedirectConfig":{"Protocol":"HTTPS","Port":"443","StatusCode":"HTTP_301"}}

    # Сертификат ACM берём из Terraform (tpl-переменная)
    alb.ingress.kubernetes.io/certificate-arn: ${CERT_ARN}


spec:
  rules:
    - host: api.soc-net.lat
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
                name: backend-service
                port:
                  number: 80
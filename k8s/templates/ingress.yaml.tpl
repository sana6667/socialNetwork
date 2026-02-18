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

spec:
  rules:
    - host: api.soc-net.lat
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: backend-service
                port:
                  number: 80
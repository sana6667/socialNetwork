apiVersion: v1
kind: Secret
metadata:
  name: mssql-conn
  namespace: default
type: Opaque

stringData:
  ConnectionStrings__DefaultConnection: "Server=${DB_HOST},${DB_PORT};Database=${DB_NAME};User Id=${DB_USER};Password=${DB_PASSWORD};Encrypt=False;TrustServerCertificate=True;MultipleActiveResultSets=True;"

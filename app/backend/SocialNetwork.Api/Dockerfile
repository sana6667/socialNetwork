# ---------- Stage 1: Build ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копируем solution и csproj (контекст = корень репо!)
COPY backend/SocialNetwork.sln ./backend/
COPY backend/SocialNetwork.Domain/SocialNetwork.Domain.csproj backend/SocialNetwork.Domain/
COPY backend/SocialNetwork.Application/SocialNetwork.Application.csproj backend/SocialNetwork.Application/
COPY backend/SocialNetwork.Infrastructure/SocialNetwork.Infrastructure.csproj backend/SocialNetwork.Infrastructure/
COPY backend/SocialNetwork.Api/SocialNetwork.Api.csproj backend/SocialNetwork.Api/

RUN dotnet restore "backend/SocialNetwork.Api/SocialNetwork.Api.csproj"

# Копируем остальной исходник
COPY backend/SocialNetwork.Domain/ backend/SocialNetwork.Domain/
COPY backend/SocialNetwork.Application/ backend/SocialNetwork.Application/
COPY backend/SocialNetwork.Infrastructure/ backend/SocialNetwork.Infrastructure/
COPY backend/SocialNetwork.Api/ backend/SocialNetwork.Api/

# Публикуем
RUN dotnet publish "backend/SocialNetwork.Api/SocialNetwork.Api.csproj" -c Release -o /app/publish

# ---------- Stage 2: Runtime ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 80
ENV ASPNETCORE_URLS=http://+:80

# ВАЖНО: именно это запускает твой сервис внутри контейнера
ENTRYPOINT ["dotnet", "SocialNetwork.Api.dll"]

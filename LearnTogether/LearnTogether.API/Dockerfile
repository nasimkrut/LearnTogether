FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["LearnTogether.API/LearnTogether.API.csproj", "LearnTogether.API/"]
COPY ["LearnTogether.Application/LearnTogether.Application.csproj", "LearnTogether.Application/"]
COPY ["LearnTogether.Core/LearnTogether.Core.csproj", "LearnTogether.Core/"]
COPY ["LearnTogether.Infrastructure/LearnTogether.Infrastructure.csproj", "LearnTogether.Infrastructure/"]
RUN dotnet restore "LearnTogether.API/LearnTogether.API.csproj"
COPY . .
WORKDIR "/src/LearnTogether.API"
RUN dotnet build "LearnTogether.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "LearnTogether.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LearnTogether.API.dll"]

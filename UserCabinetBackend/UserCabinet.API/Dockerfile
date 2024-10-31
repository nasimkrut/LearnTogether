FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["UserCabinet.API/UserCabinet.API.csproj", "UserCabinet.API/"]
COPY ["UserCabinet.DataAccess/UserCabinet.DataAccess.csproj", "UserCabinet.DataAccess/"]
COPY ["UserCabinet.Core/UserCabinet.Core.csproj", "UserCabinet.Core/"]
RUN dotnet restore "UserCabinet.API/UserCabinet.API.csproj"
COPY . .
WORKDIR "/src/UserCabinet.API"
RUN dotnet build "UserCabinet.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "UserCabinet.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "UserCabinet.API.dll"]

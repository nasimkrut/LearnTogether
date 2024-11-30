# Этап сборки
FROM node:20 AS build
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json ./
RUN npm install

# Копируем весь исходный код проекта
COPY . .

# Собираем фронтенд
RUN npm run build

# Этап с Nginx
FROM nginx:1.25

# Копируем собранные файлы из первого этапа в директорию для статического контента в Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Открываем порт 80 для Nginx
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]

# Use Node 20.11 alpine as parent image
FROM node:20.11.0-alpine3.19 as build

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build /app/build /var/www/html/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
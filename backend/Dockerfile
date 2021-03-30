#FROM node:alpine as builder
#WORKDIR /app
#ENV NODE_ENV=production
#WORKDIR /app
#COPY ./package*.json ./
#COPY tsconfig.json ./
#RUN npm ci --production
#COPY --from=base /app ./src
#RUN npm run build
#
#FROM node:alpine
#WORKDIR /app
#COPY ./package*.json ./
#COPY --from=builder /app/build ./build
#EXPOSE 5000
#CMD npm start


FROM node:alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json ./
COPY src src
RUN npm run build

FROM node:alpine
ENV NODE_ENV=production
RUN apk add --no-cache tini
WORKDIR /usr/src/app

COPY package*.json ./
COPY swagger.yaml ./
RUN npm install
COPY --from=builder /usr/src/app/build/ build/
EXPOSE 3000
CMD npm start
FROM node:14-alpine AS builder

WORKDIR /app
COPY package*.json /app/
RUN npm ci --only=production
COPY tsconfig.json /app/
COPY . .
RUN npm run build

ENV NODE_ENV=production

EXPOSE 5000
CMD ["npm","start"]

#FROM node:14-alpine As development
#
#RUN mkdir /app
#
#WORKDIR /app
#
#COPY package*.json ./
#
#RUN npm install
#
#COPY . .
#
#RUN npm run build
#
#FROM node:14-alpine as production
#
#ENV NODE_ENV=production
#
#WORKDIR /app
#
#COPY package*.json ./
#
#RUN npm install --only=production
#
#COPY . .
#
#COPY --from=development /app/build ./build
#
#CMD ["node", "build/index.js"]
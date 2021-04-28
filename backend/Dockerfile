FROM node:14-alpine as build
WORKDIR /app
COPY *.json ./
RUN npm install
COPY src/ ./src

ENV NODE_ENV=production
RUN npm run build

FROM node:14-alpine AS deps
WORKDIR /app
COPY *.json swagger.yaml .env ./
RUN npm ci --only=production

RUN npm prune --production
RUN rm -rf node_modules/typescript

FROM node:14-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY .env swagger.yaml ./
COPY --from=deps /app/node_modules ./node_modules/
COPY --from=build /app/build ./build/
EXPOSE 5000
CMD ["node","./build/index.js"]

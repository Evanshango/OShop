FROM node:alpine

WORKDIR /app

COPY ./package*.json /app/

RUN npm install --only=prod --silent

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
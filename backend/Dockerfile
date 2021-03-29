FROM node:alpine

WORKDIR /app
COPY ./package*.json /app/
RUN npm install --silent
COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
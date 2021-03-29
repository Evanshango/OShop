FROM node:alpine as client

WORKDIR /app

COPY ./package*.json /app/

RUN npm install --silent

COPY . .

ENV REACT_APP_BASE_URL="https://www.api.codewithevans.com"

ENV PATH /app/node_modules/.bin:$PATH

RUN npm run build

EXPOSE 3001

CMD ["npm","start"]
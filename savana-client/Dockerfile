FROM node:alpine

WORKDIR /app

COPY ./package*.json /app/

RUN npm install --silent

COPY . .

ENV REACT_APP_BASE_URL="https://www.api.codewithevans.com"
ENV REACT_APP_GOOGLE_CLIENT_ID=750987357762-vofc12vfah3l3msil4s5g5nsr8aligv5.apps.googleusercontent.com

ENV PATH /app/node_modules/.bin:$PATH

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]
FROM node:alpine as client

WORKDIR /app

COPY ./package*.json /app/

RUN npm install --silent

COPY . .

#ENV REACT_APP_BASE_URL="http://167.71.3.10:5000/api/v1"
ENV REACT_APP_BASE_URL="http://localhost:5000/api/v1"
ENV REACT_APP_GOOGLE_CLIENT_ID=750987357762-vofc12vfah3l3msil4s5g5nsr8aligv5.apps.googleusercontent.com

ENV PATH /app/node_modules/.bin:$PATH

RUN npm run build

FROM nginx:stable-alpine
#Copy all the contents from build directory into the web root
COPY --from=client /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
#STEP ONE Build the react project
FROM node:14-alpine as client

WORKDIR /app

COPY ./package*.json /app/

RUN npm install --silent

# RUN npm install react-scripts -g --silent

COPY . .

ENV REACT_APP_BASE_URL="http://api.codewithevans.com/api/v1"
ENV REACT_APP_GOOGLE_CLIENT_ID=750987357762-vofc12vfah3l3msil4s5g5nsr8aligv5.apps.googleusercontent.com

ENV PATH /app/node_modules/.bin:$PATH

RUN npm run build

FROM nginx:stable-alpine

#Copy all the contents from build directory into the web root
COPY --from=client /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx","-g","daemon off;"]

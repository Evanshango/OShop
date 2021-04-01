FROM node:alpine as client

WORKDIR /app

COPY ./package*.json /app/

RUN npm install --silent

COPY . .

ENV REACT_APP_BASE_URL='<BASE_URL>'
ENV REACT_APP_GOOGLE_CLIENT_ID='<GOOGLE_CLIENT_ID>'
ENV PATH /app/node_modules/.bin:$PATH

RUN npm run build

FROM nginx:stable-alpine

#Copy all the contents from build directory into the web root
COPY --from=client /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx","-g","daemon off;"]

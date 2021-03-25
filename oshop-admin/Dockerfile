FROM node:alpine as client

WORKDIR /app

COPY ./package*.json /app/

RUN npm install --silent

RUN npm install react-scripts -g --silent

COPY . .

ENV REACT_APP_BASE_URL="http://167.71.3.10:5000/api/v1"

ENV PATH /app/node_modules/.bin:$PATH

RUN npm run build

FROM nginx:stable-alpine

#Copy all the contents from build directory into the web root
COPY --from=client /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 81

CMD ["nginx","-g","daemon off;"]
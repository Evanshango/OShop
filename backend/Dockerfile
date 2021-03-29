FROM node:alpine

WORKDIR /app
COPY ./package*.json /app/
RUN npm install --silent
COPY . .

RUN npm run --max_old_space_size=4096 build

EXPOSE 5000

CMD ["npm", "start"]
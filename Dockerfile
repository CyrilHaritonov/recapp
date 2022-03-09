FROM node:alpine

WORKDIR /usr/app

COPY . .

RUN npm install

EXPOSE 2000

CMD ["npm", "run", "serve-json"]
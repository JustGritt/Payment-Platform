FROM node:18

WORKDIR /usr/src/app/payment/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
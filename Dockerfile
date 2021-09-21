FROM node:14

WORKDIR .

COPY package*.json .
RUN npm i --production

COPY . .
RUN npm run build
EXPOSE 3000

CMD npm start
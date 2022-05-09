FROM node:16

WORKDIR .

ARG NODE_ENV
ARG DATABASE_URL
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG AUTH_SECRET
ARG AUTH_URL
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_MAPTILER_ACCESS_TOKEN
ARG SENDGRID_API_KEY
ARG SENDGRID_SENDER

COPY package*.json .
RUN npm ci --production
RUN npm i --save-dev typescript postcss ts-node sharp
COPY . .
RUN npm run db:generate
RUN npm run build
EXPOSE 3000

CMD npm start
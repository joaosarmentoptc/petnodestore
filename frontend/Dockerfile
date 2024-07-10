FROM node:22.3.0-bullseye

ARG APP=/app

WORKDIR $APP

COPY package*.json $APP/

RUN npm install
RUN npm update

COPY . $APP

EXPOSE 5173

CMD ["npm", "run", "dev"]
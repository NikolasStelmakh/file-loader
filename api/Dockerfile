FROM node:18.13.0

WORKDIR /usr/test/api

COPY package.json /usr/test/api
RUN npm i

COPY . .

RUN ls

EXPOSE 3000
CMD ["npm", "run", "start:dev"]

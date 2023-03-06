FROM node:18.13.0

WORKDIR /usr/test/client

COPY package.json /usr/test/client
RUN npm i

COPY . .

EXPOSE 3010
CMD ["npm", "run", "start"]

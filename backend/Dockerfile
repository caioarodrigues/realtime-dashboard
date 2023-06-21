FROM node:18.12.1

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install --g typescript
RUN npm install --g ts-node

COPY . .

EXPOSE 3000

CMD ["ts-node", "server.ts"]
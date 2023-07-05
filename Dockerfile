FROM node:16

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig*.json ./
COPY src /app/src

RUN ls -a

RUN npm install
RUN npx prisma generate
RUN npm run build

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "server" ]

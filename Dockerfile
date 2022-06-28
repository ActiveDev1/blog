FROM node:slim AS development

WORKDIR /usr/src/app

COPY prisma ./prisma/
COPY package*.json ./
COPY tsconfig*.json ./
COPY .env ./

RUN npm install --force glob rimraf

RUN npm ci --force

COPY . .

RUN npm run prisma:deploy
RUN npm run build

FROM node:slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY prisma ./prisma/
COPY package*.json ./
COPY tsconfig*.json ./
COPY .env ./

RUN npm ci --force --only=production

COPY . .

RUN npm run prisma:deploy
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
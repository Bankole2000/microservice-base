FROM node:16-alpine as base

FROM base as dev

WORKDIR /app

# ENV NODE_ENV=dev

COPY package.json .
COPY tsconfig.json .

RUN npm install

COPY ./src ./src
COPY ./config ./config
# COPY ./prisma ./prisma
# COPY .env ./

# RUN printenv

# RUN npm install -g dotenv-cli

# RUN npx prisma generate

# RUN dotenv -e dev.env -- npx prisma migrate deploy

# ARG API_PORT=3000
# ARG PRISMA_PORT=5555
# ENV DATABASE_URL=''
# ENV PRISMA_PORT $PRISMA_PORT

EXPOSE 3000
EXPOSE 5555

CMD ["npm", "run", "dev"]


FROM base as production
##### actual production build
# ENV NODE_ENV=prod
# ADD package.json /tmp/package.json
# ADD package-lock.json /tmp/package-lock.json
# RUN rm -rf build
# RUN cd /tmp && npm install
# ADD ./ /src
# RUN rm -rf src/node_modules && cp -a /tmp/node_modules /src/
# WORKDIR /src
# RUN npm run build
# CMD ["node", "build/src/app.js"]
#### end of actual produciton build

# temporary dev build
WORKDIR /app

ENV NODE_ENV=development

COPY package.json .
COPY tsconfig.json .

RUN npm install

COPY ./src ./src
COPY ./config ./config
# COPY ./prisma ./prisma
# COPY .env ./

# RUN printenv

# RUN npm install -g dotenv-cli

# RUN npx prisma generate

# RUN dotenv -e dev.env -- npx prisma migrate deploy

# ARG API_PORT=3000
# ARG PRISMA_PORT=5555
# ENV DATABASE_URL=''
# ENV PRISMA_PORT $PRISMA_PORT

EXPOSE 4000
EXPOSE 5555

CMD ["npm", "run", "dev"]

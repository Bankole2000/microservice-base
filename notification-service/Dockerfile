FROM node:16-alpine

WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./

RUN npm install
COPY ./ ./

RUN npm run build

# EXPOSE 4001

CMD ["node", "build/src/app.js"]
FROM node:18-alpine AS builder
WORKDIR /app

ENV PUBLIC_PB_URL="http://localhost:8080"
ENV PRIVATE_PB_SERVICE_ACCOUNT_USERNAME="service-account@example.com"
ENV PRIVATE_PB_SERVICE_ACCOUNT_PASSWORD="supersecretpassword"

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build
RUN npm prune --production

FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/build build
COPY --from=builder /app/node_modules ./node_modules/

EXPOSE 3000
ENV NODE_ENV="production"

CMD ["node", "build"]
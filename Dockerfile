FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app /app
RUN npm install
COPY app ./app
EXPOSE 8080
CMD ["node", "app/server.js"]




FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Para o healthcheck do docker-compose que usa wget
RUN apk add --no-cache wget

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000
CMD ["npm","start"]   # next start -H 0.0.0.0 -p 3000

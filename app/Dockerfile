# Build + Run simples (sem standalone)
FROM node:20-alpine

WORKDIR /app

# Instala TODAS as deps (inclui devDeps p/ Tailwind/PostCSS no build)
COPY package*.json ./
RUN npm ci

# Copia o código e faz o build
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Produção
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000
CMD ["npm","start"]   # "start": "next start -p 3000"

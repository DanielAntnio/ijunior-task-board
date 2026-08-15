# 1. Imagem base: Node 22 no Alpine (leve)
FROM node:22-alpine

# 2. Diretório de trabalho dentro do container
WORKDIR /app

# 3. Copiar arquivos de dependência PRIMEIRO (otimiza cache do Docker)
COPY package*.json ./
COPY prisma ./prisma/

# 4. Instalar dependências
RUN npm ci

# 5. Gerar o Prisma Client
RUN npx prisma generate

# 6. Copiar o restante do código
COPY . .

# 7. Build do TypeScript
RUN npm run build

# 8. Porta que a aplicação vai escutar
EXPOSE 3000

# 9. Comando para iniciar
CMD ["node", "dist/src/server.js"]
FROM node:20-slim AS install

WORKDIR /app

COPY . .

RUN npm install

FROM node:alpine3.20 AS serve

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

COPY --from=install --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=install --chown=nodejs:nodejs /app/package.json ./package.json
COPY --from=install --chown=nodejs:nodejs /app/main.js ./main.js

CMD ["node", "main.js"]
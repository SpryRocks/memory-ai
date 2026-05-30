FROM node:24-slim AS base
WORKDIR /app

COPY package.json yarn.lock ./

FROM base AS builder
WORKDIR /app

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:24-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN mkdir -p .lancedb

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

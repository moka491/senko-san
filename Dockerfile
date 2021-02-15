FROM node:14 as base
WORKDIR /app

# Development stage
FROM base as development
VOLUME ["/app"]
CMD ["npm", "run", "dev"]

# Build stage
FROM base as builder
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

RUN rm -r node_modules && \
    npm ci --production

# Production stage
FROM gcr.io/distroless/nodejs as production

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY config/config.toml /app/config/config.toml

WORKDIR /app/dist

CMD ["app.js"]
# Multi-stage Dockerfile for Google Cloud Run
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build app (Vite frontend + esbuild server)
COPY . .
RUN npm run build

# Production runtime stage
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Copy production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built assets and bundled server from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist-server.js ./dist-server.js

# Non-root user for security
USER node

EXPOSE 8080

CMD ["node", "dist-server.js"]

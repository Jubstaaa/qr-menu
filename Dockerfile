    FROM oven/bun:1.0-alpine AS builder

    WORKDIR /app
    
    COPY package.json bun.lockb* ./
    COPY apps/backend/package.json ./apps/backend/
    COPY packages/*/package.json ./packages/*/
    
    RUN bun install --frozen-lockfile
    
    COPY . .
    
    RUN bun run build
    
    FROM oven/bun:1.0-alpine AS production
    
    WORKDIR /app
    
    COPY package.json bun.lockb* ./
    COPY apps/backend/package.json ./apps/backend/
    RUN bun install --frozen-lockfile --production
    
    COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
    COPY --from=builder /app/packages ./packages
    
    EXPOSE 8080
    
    WORKDIR /app/apps/backend
    
    CMD ["bun", "run", "start"]
    
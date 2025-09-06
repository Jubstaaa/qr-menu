    FROM oven/bun:1.2.21-alpine AS builder

    WORKDIR /app
    
    COPY package.json bun.lockb* ./
    COPY apps ./apps
    COPY packages ./packages
    
    RUN bun install --frozen-lockfile
    
    COPY . .
    
    FROM oven/bun:1.2.21-alpine AS production
    
    WORKDIR /app
    
    COPY package.json bun.lockb* ./
    COPY apps ./apps
    COPY packages ./packages
    
    RUN bun install --frozen-lockfile --production
    
    COPY --from=builder /app/apps ./apps
    COPY --from=builder /app/packages ./packages
    
    EXPOSE 8080
    
    WORKDIR /app/apps/backend
    CMD ["bun", "run", "start"]
    
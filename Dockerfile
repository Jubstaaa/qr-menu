FROM oven/bun:1.2.21-alpine

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

RUN bun turbo run build --filter=@qrmenu/backend --filter=@qrmenu/shared-types --filter=@qrmenu/shared-config --filter=@qrmenu/shared-utils --filter=@qrmenu/shared-validation --filter=@qrmenu/shared-validation

WORKDIR /app/apps/backend
EXPOSE 8080

CMD ["bun", "run", "start"]

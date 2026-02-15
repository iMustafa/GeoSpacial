FROM node:20-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/design-system/package.json packages/design-system/
COPY packages/api/api-types/package.json packages/api/api-types/
COPY packages/api/api-hooks/package.json packages/api/api-hooks/
COPY packages/api/api-maat/package.json packages/api/api-maat/
COPY packages/api/api-base/package.json packages/api/api-base/
COPY packages/hooks/package.json packages/hooks/
COPY client/package.json client/
COPY server/package.json server/

RUN pnpm install

COPY packages packages
COPY client client

WORKDIR /app/client
CMD ["pnpm", "dev", "--host"]

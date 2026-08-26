FROM node:22-bookworm-slim AS build

WORKDIR /workspace

RUN corepack enable && corepack prepare pnpm@11.19.0 --activate

COPY . .

RUN pnpm install --frozen-lockfile

ARG DOCS_BASE_PATH=/
ENV DOCS_BASE_PATH=${DOCS_BASE_PATH}

RUN pnpm docs:build

FROM scratch AS artifact

COPY --from=build /workspace/docs/site/dist /

FROM nginx:1.27-alpine AS site

COPY --from=build /workspace/docs/site/dist /usr/share/nginx/html
COPY docs/site/nginx.conf /etc/nginx/conf.d/default.conf

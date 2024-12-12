FROM node:20-alpine

# 安装基础工具
RUN apk add --no-cache git

# 安装 pnpm
RUN corepack enable && corepack prepare pnpm@9.1.1 --activate

WORKDIR /app

# 使用非 root 用户
USER node

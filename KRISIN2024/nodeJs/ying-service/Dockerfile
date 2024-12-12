# 定义构建阶段
FROM node:18.16.0-slim AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml 文件到工作目录
COPY package.json pnpm-lock.yaml ./

# 设置 npm 镜像源
RUN npm config set registry https://registry.npmmirror.com/

# 安装 pnpm
RUN npm install -g pnpm@8.5.1

# 安装依赖
RUN pnpm install

# 复制项目文件到工作目录
COPY . .

# 复制 .env 文件到工作目录
COPY .env ./

# 构建项目
RUN pnpm run build

# 定义运行阶段
FROM node:18.16.0-slim

# 安装 pm2
RUN npm install -g pm2

# 设置工作目录
WORKDIR /app

# 从构建阶段复制必要的文件
COPY --from=builder /app/dist-app ./dist-app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yam
COPY --from=builder /app/ecosystem.config.js ./ecosystem.config.js

# 从构建阶段复制 .env 文件到工作目录
COPY --from=builder /app/.env ./

# 暴露容器端口
EXPOSE 3000

# 使用 pm2 运行项目
CMD ["pm2-runtime", "start", "ecosystem.config.js"]

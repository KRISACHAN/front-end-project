# 使用官方 MySQL 镜像
FROM mysql:latest

# 设置环境变量，以便在容器启动时自动执行这些脚本
# 设置 MySQL root 用户的密码
ENV MYSQL_ROOT_PASSWORD=123456
# 创建一个名为 example_db 的数据库
ENV MYSQL_DATABASE=example_db

# 将初始化脚本添加到容器的 `/docker-entrypoint-initdb.d` 目录下
# MySQL 容器启动时会自动执行该目录下的脚本来初始化数据库
COPY init.sql /docker-entrypoint-initdb.d/

# 默认情况下，无需暴露端口或设置 CMD，因为基础镜像已经处理好了
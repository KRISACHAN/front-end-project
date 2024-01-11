# 构建命令

要构建你的 Docker 镜像并运行它，然后进入到 Docker 容器里的命令行，你可以按照以下步骤操作：

## 步骤 1: 构建 Docker 镜像

首先，在包含你的 Dockerfile 的目录下执行以下命令来构建 Docker 镜像。这里假设你想将你的镜像命名为 my-mysql-image：

```shell
docker build -t my-mysql-image .
```

这个命令会读取当前目录下的 Dockerfile 并构建一个名为 my-mysql-image 的 Docker 镜像。

## 步骤 2: 运行 Docker 容器

接下来，使用以下命令运行你刚才构建的 Docker 镜像：

```shell
docker run --name my-mysql-container -d my-mysql-image
```

这个命令会从 my-mysql-image 镜像启动一个新的容器，容器名为 my-mysql-container。-d 参数表示容器将在后台运行。

## 步骤 3: 进入 Docker 容器的命令行

最后，要进入正在运行的容器的命令行界面，你可以使用 docker exec 命令启动一个交互式的 bash 会话：

```shell
docker exec -it my-mysql-container bash
```

这个命令会启动一个交互式的 bash 会话，允许你在容器的命令行中执行命令。如果你的容器内没有 bash，可以尝试使用 sh 替代 bash：

```shell
docker exec -it my-mysql-container sh
```

## 连接到 MySQL

一旦你在容器的命令行中，你可以使用 MySQL 命令行工具连接到 MySQL 服务器：

```shell
mysql -u root -p
```

系统会提示你输入密码，这里应该输入你在 Dockerfile 中设置的 MYSQL_ROOT_PASSWORD 的值，即 `123456`。

按照这些步骤，你就可以构建你的 Docker 镜像，运行它，并进入到容器的命令行中，最后连接到 MySQL 服务器了。
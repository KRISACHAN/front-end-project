# 删除命令

要删除你创建的 Docker 镜像，你可以使用 docker rmi 命令，后面跟上镜像的名称或镜像 ID。如果你的镜像名称是 my-mysql-image，如之前的例子所示，你可以按照以下步骤删除它：

## 步骤 1: 停止并删除容器

在删除镜像之前，你需要先停止并删除任何正在运行的容器，这些容器是基于该镜像创建的。首先，停止容器：

```shell
docker stop my-mysql-container
```

然后，删除容器：

```shell
docker rm my-mysql-container
```

## 步骤 2: 删除镜像

一旦容器被停止并删除，你就可以安全地删除镜像了：

```shell
docker rmi my-mysql-image
```

如果镜像被其他容器使用，你可能需要先删除那些容器，或者使用 -f（或 --force）选项来强制删除镜像：

```shell
docker rmi -f my-mysql-image
```

请注意，使用 -f 选项可能会导致数据丢失，因为它会强制删除所有依赖于该镜像的容器。

## 查看镜像和容器

如果你不确定镜像或容器的名称，你可以使用以下命令列出所有镜像和容器：

列出所有镜像：

```shell
docker images
```

列出所有容器（包括非运行状态的）：

```shell
docker ps -a
```

这些命令会帮助你找到正确的镜像和容器名称或 ID，以便进行删除。
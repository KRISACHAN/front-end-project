# MySQL 常用命令

以下是一些 MySQL 常用命令的 Markdown 格式文档，包括数据库操作、表操作和数据操作等基本命令。

## 数据库操作

### 显示所有数据库

```sql
SHOW DATABASES;
```

### 创建数据库

```sql
CREATE DATABASE database_name;
```

### 删除数据库

```sql
DROP DATABASE database_name;
```

### 选择数据库

```sql
USE database_name;
```

## 表操作

### 显示当前数据库的所有表

```sql
SHOW TABLES;
```

### 创建表

```sql
CREATE TABLE table_name (
    column1 datatype
    column2 datatype,
    column3 datatype,
    ...
);
```

### 删除表

```sql
DROP TABLE table_name;
```

### 显示表结构

```sql
DESCRIBE table_name;
```

## 数据操作

### 插入数据

```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

### 查询数据

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

### 更新数据

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

### 删除数据

```sql
DELETE FROM table_name WHERE condition;
```

## 事务控制

### 开始事务

```sql
START TRANSACTION;
```

### 提交事务

```sql
COMMIT;
```

### 回滚事务

```sql
ROLLBACK;
```

## 用户和权限

### 创建用户

```sql
CREATE USER 'username'@'host' IDENTIFIED BY 'password';
```

### 授予权限

```sql
GRANT ALL PRIVILEGES ON database.table TO 'username'@'host';
```

### 显示权限

```sql
SHOW GRANTS FOR 'username'@'host';
```

### 撤销权限

```sql
REVOKE ALL PRIVILEGES ON database.table FROM 'username'@'host';
```

### 删除用户

```sql
DROP USER 'username'@'host';
```

这些是 MySQL 中一些最基本和最常用的命令，涵盖了数据库和表的创建、删除、数据的增删改查，以及事务和用户权限的管理。

请注意，实际使用时，需要将 database_name, table_name, column1, datatype, value1, username, host, password 等占位符替换为具体的数据库名、表名、列名、数据类型、值、用户名、主机名和密码。

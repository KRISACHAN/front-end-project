# 基本的后台管理系统 MySQL RBAC 权限控制表设计

## 表设计

> 在这个权限控制表中，管理员表(admin)包含了用户的基本信息，角色表(role)包含了角色的基本信息，权限表(permissions)包含了系统中可用的权限信息。角色权限关联表(role_permissions)记录了角色和权限的关联信息，用户角色关联表(admin_role)记录了用户和角色的关联信息。
> 当一个用户登录到系统中后，系统会根据该用户所拥有的角色，检查该用户是否有执行某些操作的权限。如果该用户所属角色具有相应的权限，则该用户就可以执行该操作。如果该用户所属角色不具有相应的权限，则该用户就不能执行该操作。
> 通过这样的权限控制机制，可以为不同的用户赋予不同的角色，而每个角色可以拥有不同的权限，从而实现系统的安全控制。

### 管理员表 (admin)

| 字段名     | 类型         | 描述                          |
| ---------- | ------------ | ----------------------------- |
| id         | int(11)      | 主键，自增                    |
| username   | varchar(255) | 用户名，唯一                   |
| password   | varchar(255) | 密码                           |
| email      | varchar(255) | 邮箱，唯一                     |
| status     | tinyint(1)   | 用户状态（0：禁用，1：启用）    |
| created_at | datetime     | 创建时间                      |
| updated_at | datetime     | 更新时间                      |

### 角色表 (role)

| 字段名      | 类型         | 描述             |
| ----------- | ------------ | ---------------- |
| id          | int(11)      | 主键、自增       |
| name        | varchar(255) | 角色名称，唯一    |
| description | text         | 角色描述         |
| created_at  | datetime     | 创建时间         |
| updated_at  | datetime     | 更新时间         |

### 权限表 (permissions)

| 字段名      | 类型         | 描述             |
| ----------- | ------------ | ---------------- |
| id          | int(11)      | 主键、自增       |
| name        | varchar(255) | 权限名称，唯一    |
| description | text         | 权限描述         |
| created_at  | datetime     | 创建时间         |
| updated_at  | datetime     | 更新时间         |

### 角色权限关联表 (role_permissions)

| 字段名        | 类型     | 描述                                 |
| ------------- | -------- | ------------------------------------ |
| id            | int(11)  | 主键、自增                           |
| role_id       | int(11)  | 角色ID，与 permission_id 组合唯一      |
| permission_id | int(11)  | 权限ID，与 role_id 组合唯一          |
| created_at    | datetime | 创建时间                             |
| updated_at    | datetime | 更新时间                             |

### 用户角色关联表 (admin_role)

| 字段名     | 类型     | 描述                           |
| ---------- | -------- | ------------------------------ |
| id         | int(11)  | 主键、自增                     |
| admin_id   | int(11)  | 用户ID，与 role_id 组合唯一      |
| role_id    | int(11)  | 角色ID，与 admin_id 组合唯一      |
| created_at | datetime | 创建时间                       |
| updated_at | datetime | 更新时间                       |

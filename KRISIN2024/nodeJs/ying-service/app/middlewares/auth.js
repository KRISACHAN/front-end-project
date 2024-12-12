import jwt from 'jsonwebtoken';
import parseBearerToken from 'parse-bearer-token';
import { pick } from 'lodash';
import { AdminDao } from '@dao/admin/admin';
import { RoleDao } from '@dao/admin/role';
import { AdminRoleDao } from '@dao/admin/admin-role';
import { RolePermissionDao } from '@dao/admin/role-permission';
import { PermissionDao } from '@dao/admin/permission';
import {
    FORBIDDEN,
    NOT_FOUND,
    UNAUTHORIZED,
    INTERNAL_SERVER_ERROR,
} from '@utils/http-errors';

// 定义鉴权中间件
const auth = async (ctx, next) => {
    // 从请求头中获取 Authorization 字段
    const parsedToken = parseBearerToken(ctx.request);
    if (!parsedToken) {
        throw UNAUTHORIZED('未登录，请先登录');
    }

    // 从 token 中获取 uid 和 scope
    let uid;
    let scope;
    try {
        const tokenData = jwt.verify(
            parsedToken,
            process.env.JWT_ACCESS_SECRET_KEY,
        );
        uid = tokenData.uid;
        scope = tokenData.scope;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw UNAUTHORIZED('token已过期，请重新登录');
        }
        throw FORBIDDEN(error.message || '权限不足');
    }

    // 根据 uid 获取 admin 信息
    const admin = await AdminDao.search({ id: uid });
    if (!admin || !admin.status) {
        throw NOT_FOUND('管理员不存在');
    }

    // 根据 admin 的 id 获取 admin_role 信息
    const adminRoles = await AdminRoleDao.queryByAdmin(uid);
    if (!adminRoles || adminRoles.length === 0) {
        throw INTERNAL_SERVER_ERROR('获取管理员角色失败');
    }

    // 获取角色信息
    const roles = await Promise.all(
        adminRoles.map(role => RoleDao.search(role.role_id)),
    );
    const roleIds = roles.map(role => role.id);

    // 根据角色的 id 获取所有角色权限信息
    const rolePermissions = await Promise.all(
        roleIds.map(roleId => RolePermissionDao.queryByRole(roleId)),
    );
    const permissionIds = rolePermissions.flat().map(rp => rp.permission_id);

    // 根据 permission 的 id 获取权限信息
    const permissions = await Promise.all(
        permissionIds.map(permissionId => PermissionDao.search(permissionId)),
    );

    // 检查用户是否有访问权限
    const hasPermission = permissions.some(
        permission => permission.id === scope,
    );
    if (!hasPermission) {
        throw FORBIDDEN('没有访问权限');
    }

    // 把用户信息存储到 ctx.admin 中
    ctx.admin = {
        admin: pick(admin, ['id', 'username', 'email']),
        roles: roles.map(role => pick(role, ['id', 'name', 'description'])),
        permissions: permissions.map(permission =>
            pick(permission, ['id', 'name', 'description']),
        ),
    };

    // 把 uid 和 scope 存储到 ctx.auth 中
    ctx.auth = {
        uid,
        scope,
    };

    // 执行下一个中间件
    await next();
};

export default auth;

import { RolePermissionModel } from '@models/admin/role-permission';
import { PRECONDITION_FAILED, INTERNAL_SERVER_ERROR } from '@utils/http-errors';

export class RolePermissionDao {
    // 创建角色权限
    static async create({ roleId, permissionId }) {
        // 查询是否已存在该记录
        const whereQuery = {
            deleted_at: null,
        };
        if (roleId) {
            whereQuery.role_id = roleId;
        }
        if (permissionId) {
            whereQuery.permission_id = permissionId;
        }
        const existedRolePermission = await RolePermissionModel.findOne({
            where: whereQuery,
        });
        if (existedRolePermission) {
            throw PRECONDITION_FAILED('角色权限关联已存在');
        }
        const rolePermission = new RolePermissionModel({
            role_id: roleId,
            permission_id: permissionId,
        });
        const result = await rolePermission.save();

        if (!result) {
            throw INTERNAL_SERVER_ERROR('角色权限创建失败');
        }

        return true;
    }

    // 更新角色权限
    static async updateByRole({ roleId, permissionId }) {
        const rolePermission = await RolePermissionModel.findOne({
            where: { role_id: roleId, deleted_at: null },
        });
        if (!rolePermission) {
            throw INTERNAL_SERVER_ERROR('角色权限不存在');
        }

        if (permissionId) {
            rolePermission.permission_id = permissionId;
        }

        const updatedRolePermission = await rolePermission.save();

        if (!updatedRolePermission) {
            throw INTERNAL_SERVER_ERROR('更新角色权限失败');
        }

        return true;
    }

    // 更新权限所属的角色
    static async updateByPermission({ roleId, permissionId }) {
        const rolePermission = await RolePermissionModel.findOne({
            permission_id: permissionId,
            deleted_at: null,
        });
        if (!rolePermission) {
            throw INTERNAL_SERVER_ERROR('权限所属的角色不存在');
        }

        if (roleId) {
            rolePermission.role_id = roleId;
        }

        const updatedRolePermission = await rolePermission.save();

        if (!updatedRolePermission) {
            throw INTERNAL_SERVER_ERROR('更新角色权限失败');
        }

        return true;
    }

    // 查询指定角色的所有权限
    static async queryByRole(roleId) {
        const rolePermission = await RolePermissionModel.findAll({
            where: { role_id: roleId, deleted_at: null },
        });

        if (!rolePermission) {
            throw INTERNAL_SERVER_ERROR('获取角色权限失败');
        }

        return rolePermission;
    }

    // 查询拥有相同权限的角色
    static async queryByPermission(permissionId) {
        const rolePermission = await RolePermissionModel.findAll({
            permission_id: permissionId,
            deleted_at: null,
        });

        if (!rolePermission) {
            throw INTERNAL_SERVER_ERROR('获取角色权限失败');
        }

        return rolePermission;
    }

    // 删除指定角色的所有权限
    static async deleteByRole(roleId) {
        const rolePermission = await RolePermissionModel.deleteMany({
            where: { role_id: roleId, deleted_at: null },
        });

        if (!rolePermission) {
            throw INTERNAL_SERVER_ERROR('删除角色权限失败');
        }

        return true;
    }

    // 删除指定权限的所有角色关联
    static async deleteByPermission(permissionId) {
        const rolePermission = await RolePermissionModel.deleteMany({
            permission_id: permissionId,
            deleted_at: null,
        });

        if (!rolePermission) {
            throw INTERNAL_SERVER_ERROR('删除权限关联失败');
        }

        return true;
    }

    // 查询角色权限列表
    static async query({ pageNum = 1, pageSize = 10 }) {
        const result = await RolePermissionModel.findAndCountAll({
            where: { deleted_at: null },
            offset: (pageNum - 1) * pageSize,
            limit: pageSize,
            order: [['id', 'DESC']],
        });

        if (!result) {
            throw INTERNAL_SERVER_ERROR('查询角色权限列表失败');
        }

        return {
            page: {
                count: pageNum,
                size: pageSize,
                total: result.count,
            },
            data: result.rows,
        };
    }
}

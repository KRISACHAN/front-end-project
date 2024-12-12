import { AdminRoleModel } from '@models/admin/admin-role';
import { PRECONDITION_FAILED, INTERNAL_SERVER_ERROR } from '@utils/http-errors';

export class AdminRoleDao {
    // 创建管理员角色
    static async create({ roleId, adminId }) {
        // 查询是否已存在该记录
        const whereQuery = {
            deleted_at: null,
        };
        if (roleId) {
            whereQuery.role_id = roleId;
        }
        if (adminId) {
            whereQuery.admin_id = adminId;
        }
        const existedAdminRole = await AdminRoleModel.findOne({
            where: whereQuery,
        });
        if (existedAdminRole) {
            throw PRECONDITION_FAILED('管理员角色关联已存在');
        }
        const AdminRole = new AdminRoleModel({
            role_id: roleId,
            admin_id: adminId,
        });
        const result = await AdminRole.save();

        if (!result) {
            throw INTERNAL_SERVER_ERROR('管理员角色创建失败');
        }

        return true;
    }

    // 更新管理员角色
    static async updateByRole({ roleId, adminId }) {
        const AdminRole = await AdminRoleModel.findOne({
            where: {
                role_id: roleId,
                deleted_at: null,
            },
        });
        if (!AdminRole) {
            throw INTERNAL_SERVER_ERROR('管理员角色不存在');
        }

        if (adminId) {
            AdminRole.admin_id = adminId;
        }

        const updatedAdminRole = await AdminRole.save();

        if (!updatedAdminRole) {
            throw INTERNAL_SERVER_ERROR('更新管理员角色失败');
        }

        return true;
    }

    // 更新角色所属的管理员
    static async updateByAdmin({ roleId, adminId }) {
        const AdminRole = await AdminRoleModel.findOne({
            where: {
                admin_id: adminId,
                deleted_at: null,
            },
        });
        if (!AdminRole) {
            throw INTERNAL_SERVER_ERROR('角色所属的管理员不存在');
        }

        if (roleId) {
            AdminRole.role_id = roleId;
        }

        const updatedAdminRole = await AdminRole.save();

        if (!updatedAdminRole) {
            throw INTERNAL_SERVER_ERROR('更新管理员角色失败');
        }

        return true;
    }

    // 查询指定管理员的所有角色
    static async queryByRole(roleId) {
        const adminRoles = await AdminRoleModel.findAll({
            where: {
                role_id: roleId,
                deleted_at: null,
            },
        });

        if (!adminRoles) {
            throw INTERNAL_SERVER_ERROR('获取管理员角色失败');
        }

        return adminRoles; // 返回所有相关的管理员角色
    }

    // 查询指定管理员的所有角色
    static async queryByAdmin(adminId) {
        const adminRoles = await AdminRoleModel.findAll({
            where: {
                admin_id: adminId,
                deleted_at: null,
            },
        });

        if (!adminRoles) {
            throw INTERNAL_SERVER_ERROR('获取管理员角色失败');
        }

        return adminRoles; // 返回所有相关的角色
    }

    // 删除指定管理员的所有角色
    static async deleteByRole(roleId) {
        const result = await AdminRoleModel.deleteMany({
            role_id: roleId,
            deleted_at: null,
        });

        if (!result) {
            throw INTERNAL_SERVER_ERROR('删除管理员角色失败');
        }

        return true;
    }

    // 删除指定角色的所有管理员关联
    static async deleteByPermission(adminId) {
        const result = await AdminRoleModel.deleteMany({
            admin_id: adminId,
            deleted_at: null,
        });

        if (!result) {
            throw INTERNAL_SERVER_ERROR('删除角色关联失败');
        }

        return true;
    }

    // 查询管理员角色列表
    static async query({ pageNum = 1, pageSize = 10 }) {
        const result = await AdminRoleModel.findAndCountAll({
            where: { deleted_at: null },
            offset: (pageNum - 1) * pageSize,
            limit: pageSize,
            order: [['id', 'DESC']],
        });

        if (!result) {
            throw INTERNAL_SERVER_ERROR('查询管理员角色列表失败');
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

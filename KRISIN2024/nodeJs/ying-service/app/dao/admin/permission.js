import { PermissionModel } from '@models/admin/permission';
import {
    PRECONDITION_FAILED,
    NOT_FOUND,
    INTERNAL_SERVER_ERROR,
} from '@utils/http-errors';

export class PermissionDao {
    // 创建权限
    static async create({ name, description }) {
        const existedPermission = await PermissionModel.findOne({
            where: { name, deleted_at: null },
        });

        if (existedPermission) {
            throw PRECONDITION_FAILED('权限已存在');
        }

        const permission = new PermissionModel({ name, description });
        const savedPermission = await permission.save();

        if (!savedPermission) {
            INTERNAL_SERVER_ERROR('创建权限失败');
        }

        return true;
    }

    // 查询权限信息
    static async search({ id, name }) {
        const whereQuery = {
            deleted_at: null,
        };
        if (name) {
            whereQuery.name = name;
        }
        if (id) {
            whereQuery.id = id;
        }
        const permission = await PermissionModel.findOne({
            where: whereQuery,
        });

        if (!permission) {
            throw NOT_FOUND('权限不存在');
        }

        return permission;
    }

    // 更新权限信息
    static async update(id, { name, description }) {
        const permission = await PermissionModel.findOne({
            where: { id, deleted_at: null },
        });

        if (!permission) {
            throw NOT_FOUND('权限不存在');
        }

        if (name) {
            permission.name = name;
        }

        if (description) {
            permission.description = description;
        }

        const updatedPermission = await permission.save();

        if (!updatedPermission) {
            INTERNAL_SERVER_ERROR('更新权限失败');
        }

        return true;
    }

    // 删除权限
    static async delete(id) {
        const permission = await PermissionModel.findOne({
            where: { id, deleted_at: null },
        });

        if (!permission) {
            throw NOT_FOUND('权限不存在');
        }

        const deletedPermission = await permission.destroy();

        if (!deletedPermission) {
            INTERNAL_SERVER_ERROR('删除权限失败');
        }

        return true;
    }

    // 查询权限列表
    static async query({ pageNum = 1, pageSize = 10 }) {
        const result = await PermissionModel.findAndCountAll({
            where: { deleted_at: null },
            offset: (pageNum - 1) * pageSize,
            limit: pageSize,
            order: [['id', 'DESC']],
        });

        if (!result) {
            INTERNAL_SERVER_ERROR('查询权限列表失败');
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

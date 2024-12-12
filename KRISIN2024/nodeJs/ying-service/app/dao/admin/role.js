import { RoleModel } from '@models/admin/role';
import {
    PRECONDITION_FAILED,
    NOT_FOUND,
    INTERNAL_SERVER_ERROR,
} from '@utils/http-errors';

export class RoleDao {
    // 创建角色
    static async create({ name, description }) {
        const existedRole = await RoleModel.findOne({
            where: { name, deleted_at: null },
        });

        if (existedRole) {
            throw PRECONDITION_FAILED('角色已存在');
        }

        const role = new RoleModel({ name, description });
        const savedRole = await role.save();

        if (!savedRole) {
            INTERNAL_SERVER_ERROR('创建角色失败');
        }

        return true;
    }

    // 查询角色信息
    static async search(id) {
        const role = await RoleModel.findOne({
            where: { id, deleted_at: null },
        });

        if (!role) {
            throw NOT_FOUND('角色不存在');
        }

        return role;
    }

    // 更新角色信息
    static async update(id, { name, description }) {
        const role = await RoleModel.findOne({
            where: { id, deleted_at: null },
        });

        if (!role) {
            throw NOT_FOUND('角色不存在');
        }

        if (name) {
            role.name = name;
        }

        if (description) {
            role.description = description;
        }

        const updatedRole = await role.save();

        if (!updatedRole) {
            INTERNAL_SERVER_ERROR('更新角色失败');
        }

        return true;
    }

    // 删除角色
    static async delete(id) {
        const role = await RoleModel.findOne({
            where: { id, deleted_at: null },
        });

        if (!role) {
            throw NOT_FOUND('角色不存在');
        }

        const deletedRole = await role.destroy();

        if (!deletedRole) {
            INTERNAL_SERVER_ERROR('删除角色失败');
        }

        return true;
    }

    // 查询角色列表
    static async query({ pageNum = 1, pageSize = 10 }) {
        const result = await RoleModel.findAndCountAll({
            where: { deleted_at: null },
            offset: (pageNum - 1) * pageSize,
            limit: pageSize,
            order: [['id', 'DESC']],
        });

        if (!result) {
            INTERNAL_SERVER_ERROR('查询角色列表失败');
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

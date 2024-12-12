import { sequelize } from '@utils/db';
import { Model, DataTypes } from 'sequelize';
import { RoleModel } from './role';
import { AdminModel } from './admin';

// 定义管理员角色模型
export class AdminRoleModel extends Model {}

// 初始管理员角色模型
AdminRoleModel.init(
    {
        id: {
            type: DataTypes.INTEGER, // 数据类型为整型
            allowNull: false, // 不允许为空
            primaryKey: true, // 设置为主键
            autoIncrement: true, // 自增
        },
        admin_id: {
            type: DataTypes.INTEGER, // 数据类型为整型
            allowNull: false, // 不允许为空
        },
        role_id: {
            type: DataTypes.INTEGER, // 数据类型为整型
            allowNull: false, // 不允许为空
        },
    },
    {
        sequelize,
        modelName: 'admin_role',
        tableName: 'admin_role',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            {
                unique: true, // 设置为唯一索引
                fields: ['admin_id', 'role_id'], // 指定索引的字段
            },
        ],
    },
);

/**
 * 关系概述:
 *  AdminRoleModel 连接 AdminModel 和 RoleModel，表示管理员与角色之间的多对多关系。
 *  每个管理员可以有多个角色，每个角色也可以被多个管理员拥有。
 *
 * 外键:
 *  admin_id 在 AdminRoleModel 中指向 AdminModel 的 id。
 *  role_id 在 AdminRoleModel 中指向 RoleModel 的 id。
 */

/**
 * 这表示 AdminRoleModel（管理员角色模型）属于 AdminModel（管理员模型）。
 * 通过 foreignKey: 'admin_id' 指定在 AdminRoleModel 中使用 admin_id 字段作为外键，指向 AdminModel 的主键 id。
 * 这意味着每个 AdminRoleModel 实例都与一个 AdminModel 实例相关联。
 */
AdminRoleModel.belongsTo(AdminModel, {
    foreignKey: 'admin_id',
    targetKey: 'id',
});
/**
 * 这表示 AdminModel 可以有多个 AdminRoleModel 实例。
 * 通过 foreignKey: 'admin_id' 指定在 AdminRoleModel 中使用 admin_id 字段作为外键。
 * 这意味着一个管理员可以拥有多个角色。
 */
AdminModel.hasMany(AdminRoleModel, { foreignKey: 'admin_id', targetKey: 'id' });

/**
 * 这表示 AdminRoleModel 属于 RoleModel（角色模型）。
 * 通过 foreignKey: 'role_id' 指定在 AdminRoleModel 中使用 role_id 字段作为外键，指向 RoleModel 的主键 id。
 * 这意味着每个 AdminRoleModel 实例都与一个 RoleModel 实例相关联。
 */
AdminRoleModel.belongsTo(RoleModel, { foreignKey: 'role_id', targetKey: 'id' });
/**
 * 这表示 RoleModel 可以有多个 AdminRoleModel 实例。
 * 通过 foreignKey: 'role_id' 指定在 AdminRoleModel 中使用 role_id 字段作为外键。
 * 这意味着一个角色可以被多个管理员拥有。
 */
RoleModel.hasMany(AdminRoleModel, { foreignKey: 'role_id', targetKey: 'id' });

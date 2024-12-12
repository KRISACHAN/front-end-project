import { sequelize } from '@utils/db';
import { Model, DataTypes } from 'sequelize';

// 定义权限模型
export class PermissionModel extends Model {}

// 初始权限模型
PermissionModel.init(
    {
        id: {
            type: DataTypes.INTEGER, // 数据类型为整型
            allowNull: false, // 不允许为空
            primaryKey: true, // 设置为主键
            autoIncrement: true, // 自增
        },
        name: {
            type: DataTypes.STRING(255), // 数据类型为字符串，最大长度为255
            allowNull: false, // 不允许为空
            unique: true, // 增加唯一性约束
        },
        description: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize,
        modelName: 'permission',
        tableName: 'permission',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);

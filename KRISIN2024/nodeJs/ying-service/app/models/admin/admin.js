import bcrypt from 'bcryptjs';
import { sequelize } from '@utils/db';
import { Model, DataTypes } from 'sequelize';

// 定义管理员模型
export class AdminModel extends Model {}

// 初始管理员模型
AdminModel.init(
    {
        id: {
            type: DataTypes.INTEGER, // 数据类型为整型
            allowNull: false, // 不允许为空
            primaryKey: true, // 设置为主键
            autoIncrement: true, // 自增
        },
        username: {
            type: DataTypes.STRING(255), // 数据类型为字符串，最大长度为255
            allowNull: false, // 不允许为空
            unique: true, // 增加唯一性约束
        },
        password: {
            type: DataTypes.STRING(255), // 数据类型为字符串，最大长度为255
            allowNull: false, // 不允许为空
        },
        email: {
            type: DataTypes.STRING(255), // 数据类型为字符串，最大长度为255
            allowNull: false, // 不允许为空
            unique: true, // 增加唯一性约束
        },
        status: {
            type: DataTypes.BOOLEAN, // 数据类型为布尔型
            allowNull: false, // 不允许为空
            defaultValue: true, // 默认为true
        },
    },
    {
        sequelize,
        modelName: 'admin',
        tableName: 'admin',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        hooks: {
            // 在创建数据前执行加密逻辑
            beforeCreate: async admin => {
                const salt = await bcrypt.genSalt(10);
                admin.password = await bcrypt.hash(admin.password, salt);
            },
            // 在更新数据前执行加密逻辑
            beforeUpdate: async admin => {
                if (admin.changed('password')) {
                    // 如果密码被修改过
                    const salt = await bcrypt.genSalt(10);
                    admin.password = await bcrypt.hash(admin.password, salt);
                }
            },
        },
    },
);

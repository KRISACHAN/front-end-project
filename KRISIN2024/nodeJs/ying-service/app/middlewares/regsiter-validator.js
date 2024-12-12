import { createValidator } from '@utils/validator';

const rules = {
    username: [
        {
            type: 'string',
            required: true,
            message: '请输入昵称',
        },
        {
            type: 'string',
            message: '昵称长度必须在 2 ~ 16 个字符之间',
            min: 2,
            max: 16,
        },
    ],
    password2: [
        {
            type: 'string',
            required: true,
            message: '请输入密码',
        },
        {
            type: 'string',
            message:
                '请输入正确格式的密码，长度必须在 8 ~ 16 个字符之间，至少一个大写字母，一个小写字母，一个数字和一个特殊字符',
            pattern:
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,16}$/,
        },
    ],
    email: [
        { type: 'email', required: true, message: '请输入正确的电子邮箱地址' },
    ],
};

const registerValidator = createValidator(rules);

export default registerValidator;

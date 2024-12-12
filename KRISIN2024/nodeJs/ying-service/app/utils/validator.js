import Validator from 'async-validator';
import to from 'await-to-js';
import { BAD_REQUEST } from '@utils/http-errors';

// 示例：
// const rules = {
//     username: [
//         {
//             type: 'string',
//             required: true,
//             message: '请输入昵称',
//         },
//         {
//             type: 'string',
//             message: '昵称长度必须在 2 ~ 16 个字符之间',
//             min: 2,
//             max: 16,
//         },
//     ],
//     password2: [
//         {
//             type: 'string',
//             required: true,
//             message: '请输入密码',
//         },
//         {
//             type: 'string',
//             message:
//                 '请输入正确格式的密码，长度必须在 8 ~ 16 个字符之间，至少一个大写字母，一个小写字母，一个数字和一个特殊字符',
//             pattern:
//                 /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,16}$/,
//         },
//     ],
//     email: [
//         { type: 'email', required: true, message: '请输入正确的电子邮箱地址' },
//     ],
// };
// const registerValidatorMiddleware = createValidator(rules);
// router.post('/register', registerValidatorMiddleware, async ctx => {});

/**
 * 根据传入的验证规则数组，返回一个 Koa 中间件函数
 * @param {Object[]} rules 验证规则数组
 * @param {string} [source='body'] 参数来源，可以是 'body', 'query', 'params' 中的一个
 * @returns {function} Koa 中间件函数
 */
export const createValidator = (rules, source = 'body') => {
    const validator = new Validator(rules);

    const validatorMiddleware = async (ctx, next) => {
        const [error, value] = await to(
            validator.validate(ctx.request[source], {
                abortEarly: false,
            }),
        );
        if (error) {
            // 如果验证失败，则抛出一个参数异常错误
            throw BAD_REQUEST(error.errors.map(e => e.message).join(','));
        }
        ctx.validate = value;
        await next();
    };

    return validatorMiddleware;
};

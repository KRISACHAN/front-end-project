import Router from 'koa-router';
import requireDirectory from 'require-directory';
import ratelimit from 'koa-ratelimit';
import logger from 'koa-logger';
import dayjs from 'dayjs';
import { mkdirPath } from '@utils/helpers';
import log from '@utils/log';

export const initLoadRouters = app => {
    // 绝对路径
    const apiDirectory = '../api';
    // 路由自动加载
    requireDirectory(module, apiDirectory, {
        visit: obj => {
            if (obj.default instanceof Router) {
                app.use(obj.default.routes());
            }
        },
    });
};

export const initRatelimit = app => {
    // 接口调用频率限制（Rate-Limiting）
    // Rate limiter middleware for koa.
    // https://github.com/koajs/ratelimit
    // eslint-disable-next-line no-undef
    const db = new Map();
    app.use(
        ratelimit({
            driver: 'memory',
            db: db,
            duration: 60000,
            errorMessage: 'Sometimes You Just Have to Slow Down.',
            id: ctx => ctx.ip,
            headers: {
                remaining: 'Rate-Limit-Remaining',
                reset: 'Rate-Limit-Reset',
                total: 'Rate-Limit-Total',
            },
            max: 100,
            disableHeader: false,
            // whitelist: ctx => {
            //     // some logic that returns a boolean
            // },
            // blacklist: ctx => {
            //     // some logic that returns a boolean
            // },
        }),
    );
};

export const initLogger = app => {
    mkdirPath('logs');
    app.use(
        logger((_, args) => {
            const [, method, url, status, time, length] = args;
            const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
            const fileContent = `${method} ${url}${status ? ` ${status}` : ''}${
                time ? ` ${time}` : ''
            }${length ? ` ${length}` : ''} ${date}`;
            log.verbose(fileContent);
        }),
    );
};

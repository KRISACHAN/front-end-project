import log from './log';

export class Resolve {
    fail(err = {}, msg = '操作失败', errorCode = 10001) {
        log.error(err);
        return {
            msg,
            err,
            error_code: errorCode,
        };
    }

    success(msg = 'success', errorCode = 0, code = 200) {
        return {
            msg,
            code,
            error_code: errorCode,
        };
    }

    json(data, msg = 'success', errorCode = 0, code = 200) {
        return {
            code,
            msg,
            error_code: errorCode,
            data,
        };
    }
}

export const resolve = new Resolve();

import Router from 'koa-router';
import httpStatus from 'http-status';

const router = new Router({
    prefix: '',
});

router.all('/health', async ctx => {
    ctx.response.status = httpStatus.OK;
    ctx.body = 'hello world';
});

export default router;

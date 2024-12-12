import Router from 'koa-router';

const router = new Router({
    prefix: '/api/test',
});

router.get('/cache', async ctx => {
    const cacheValue = Math.random() * 100;
    const cacheKey = 'cacheKey';
    await ctx.cache.set(cacheKey, cacheValue);
    const cacheData = await ctx.cache.get(cacheKey);
    ctx.response.status = 200;
    ctx.body = cacheData;
});

export default router;

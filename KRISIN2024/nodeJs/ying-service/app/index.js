import Koa from 'koa';
import { initLoadRouters, initRatelimit, initLogger } from '@utils/init';
import bodyParser from 'koa-body';
import cors from '@koa/cors';
import catchErrorMiddleware from '@middlewares/exception';
import cacheMiddleware from '@middlewares/cache';
import { getIP } from '@utils/helpers';
import log from '@utils/log';
import './env';

const app = new Koa();

app.use(cors());
app.use(catchErrorMiddleware);
app.use(cacheMiddleware);
app.use(
    bodyParser({
        multipart: true,
    }),
);
initRatelimit(app);
initLogger(app);
initLoadRouters(app);

app.listen(process.env.PORT, () => {
    log.verbose('        App running at:');
    log.verbose(`        - Local: http://localhost:${process.env.PORT}`);
    log.verbose(`        - Netword: ${getIP()}:${process.env.PORT}`);
});

export default app;

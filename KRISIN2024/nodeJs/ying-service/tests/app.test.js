import { to } from 'await-to-js';
import server from './server';

describe('测试服务', () => {
    test('测试服务是否健康', async done => {
        const app = server();
        const [err, res] = await to(app.get('/health'));
        if (err) {
            done(err);
        }
        expect(res.statusCode).toBe(200);
        done();
    });
});

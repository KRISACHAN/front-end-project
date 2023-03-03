import Koa from 'koa';
import serve from 'koa-static';
import mount from 'koa-mount';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Koa();

app.use(mount('/', serve(path.join(__dirname, '/static'))))

app.listen(7000, () => {
    console.log('✨✨✨')
});

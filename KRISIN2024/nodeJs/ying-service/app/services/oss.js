import OSS from 'ali-oss';
import to from 'await-to-js';
import log from '@utils/log';
import { get, pick } from 'lodash';

const ossParams = {
    region: process.env.OSS_REGION,
    accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    bucket: process.env.OSS_BUCKET,
    secure: true,
    endpoint: process.env.OSS_ENDPOINT,
};
export const oss = new OSS(ossParams);

class OssService {
    oss = oss;
    constructor() {}

    async fetchBuckets() {
        const [err, res] = await to(this.oss.listBuckets());
        if (err) {
            log.error(err);
            throw err; // 抛出错误
        }
        return get(res, 'buckets', []).map(bucket =>
            pick(bucket, ['name', 'creationDate']),
        );
    }

    async fetchList(params = {}) {
        const [err, res] = await to(this.oss.list(params));
        if (err) {
            log.error(err);
            throw err;
        }
        return get(res, 'objects', [])
            .filter(obj => !!obj.size)
            .map(obj => {
                const prefix = get(params, 'prefix', '');
                const data = {
                    name: get(obj, 'name', ''),
                    url: get(obj, 'url', ''),
                    size: get(obj, 'size', 0),
                };
                const [curKey] = data.name.split('/');
                data.url = this.replaceUrl(data.url, curKey);
                data.name = data.name.replace(prefix, '');
                return data;
            });
    }

    async upload({ name = '', resource = '', headers = {} }) {
        if (!name || !resource) {
            throw new Error('Name and resource are required');
        }

        const [err, res] = await to(
            this.oss.put(
                `/${process.env.OSS_STORE_KEY}/${name}`,
                Buffer.from(resource, 'base64'),
                {
                    headers,
                },
            ),
        );
        if (err) {
            log.error(err);
            throw err;
        }
        const [curKey] = res.name.split('/');
        const resUrl = this.replaceUrl(res.url, curKey);
        return {
            name: name,
            url: resUrl,
            creationDate: get(res, 'res.headers.date'),
        };
    }

    replaceUrl(url, curKey) {
        return url.replace(
            `https://${process.env.OSS_ENDPOINT}/${curKey}`,
            `https://${process.env.MAIN_HOSTNAME}/${curKey}`,
        );
    }

    getConfig() {
        return ossParams;
    }

    async getContent(name) {
        const res = await this.oss.get(name);
        return res;
    }
}

export const ossService = new OssService();
export default OssService;

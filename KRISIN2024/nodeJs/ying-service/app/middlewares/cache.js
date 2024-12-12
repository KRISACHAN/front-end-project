import Redis from 'ioredis';
import LRUCache from 'lru-cache';

class CacheStore {
    constructor() {
        this.stores = [];
    }
    add(store) {
        this.stores.push(store);
        return this;
    }
    async set(key, value, ttl) {
        for (const store of this.stores) {
            await store.set(key, value, ttl);
        }
    }
    async get(key) {
        for (const store of this.stores) {
            const value = await store.get(key);
            if (value !== undefined) return value;
        }
    }
    async del(key) {
        for (const store of this.stores) {
            await store.del(key);
        }
    }
}

class MemoryStore {
    constructor() {
        this.cache = new LRUCache({
            max: 100,
        });
    }
    async set(key, value, ttl) {
        this.cache.set(key, value, ttl);
    }
    async get(key) {
        return this.cache.get(key);
    }
    async del(key) {
        this.cache.delete(key);
    }
}

class RedisStore {
    constructor() {
        this.client = new Redis({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        });
    }
    async set(key, value, ttl) {
        if (ttl) {
            await this.client.set(key, JSON.stringify(value), 'EX', ttl);
        } else {
            await this.client.set(key, JSON.stringify(value));
        }
    }
    async get(key) {
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : undefined;
    }
    async del(key) {
        await this.client.del(key);
    }
}

// 创建一个缓存实例
const cacheStore = new CacheStore();

// 添加一些缓存层
cacheStore.add(new MemoryStore()).add(new RedisStore());

const cacheMiddleware = async (ctx, next) => {
    ctx.cache = cacheStore;
    await next();
};

export default cacheMiddleware;

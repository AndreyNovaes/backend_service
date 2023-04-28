import Redis from 'ioredis';

const redisConnection = process.env.REDIS_CONNECTION || 'redis://localhost:6379';

const redisClient = new Redis( redisConnection );

export { redisClient };

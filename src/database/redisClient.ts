import Redis from 'ioredis';

const redisConnection = process.env.REDIS_CONNECTION || 'redis://localhost:6379';
const redisPassword = process.env.REDIS_PASSWORD || '';

const redisClient = new Redis(redisConnection, {
  password: redisPassword,
});

export { redisClient };

import * as redis from 'redis';

let redisClient = null;

(async () => {
  redisClient = redis.createClient({
    // prefix: 'allowlist:',
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });

  redisClient.on('error', err => console.log('Redis Client Error', err));

  await redisClient.connect();
  console.log('redisClient conectado');
})();

export default redisClient;

import manipulaLista from './handleList';
import jwt from 'jsonwebtoken';
import { createHash } from 'crypto';
import redisClient from './connect';

// const blocklist = redis.createClient({
// 	legacyMode: true,
// 	prefix: 'blocklist-access-token:',
// 	url: process.env.REDIS_URL,
// });

// blocklist.on('error', err => console.log('Redis Client Error', err));

// await blocklist.connect();

const prefix = 'blocklist:';
const manipulaBlockList = manipulaLista(redisClient, prefix);

function geraTokenHash(token) {
  return createHash('sha256').update(token).digest('hex');
}

export default {
  async adiciona(token) {
    const dataExpiracao = jwt.decode(token).exp;
    const tokenHash = geraTokenHash(token);
    await manipulaBlockList.adiciona(tokenHash, '', dataExpiracao);
  },
  async contemToken(token) {
    const tokenHash = geraTokenHash(token);
    return manipulaBlockList.contemChave(tokenHash);
  },
};

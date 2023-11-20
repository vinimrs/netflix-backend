import redisClient from './connect';
import manipulaLista from './handleList';

const prefix = 'allowlist:';
export default manipulaLista(redisClient, prefix);

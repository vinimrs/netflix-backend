import { createClient } from 'redis';
import manipulaLista from './handleList';

const allowList = createClient({
	prefix: 'allowlist:',
	url: process.env.REDIS_URL,
});
export default manipulaLista(allowList);

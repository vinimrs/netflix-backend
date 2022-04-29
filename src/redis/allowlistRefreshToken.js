import { createClient } from 'redis';
import manipulaLista from './handleList';

const allowList = createClient({
	prefix: 'allowlist:',
	url: process.env.HEROKU_REDIS_CHARCOAL_URL,
});
export default manipulaLista(allowList);

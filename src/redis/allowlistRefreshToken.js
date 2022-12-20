import * as redis from 'redis';
import manipulaLista from './handleList';

let allowList = null;

(async () => {
	allowList = redis.createClient({
		legacyMode: true,
		prefix: 'allowlist:',
		url: process.env.REDIS_URL,
	});

	allowList.on('error', err => console.log('Redis Client Error', err));

	await allowList.connect();
})();

export default manipulaLista(allowList);

import { createClient } from 'redis';
import manipulaLista from './handleList';

const allowList = createClient({ prefix: 'allowlist:' });
export default manipulaLista(allowList);

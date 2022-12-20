"use strict";

var _app = _interopRequireDefault(require("./app"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const port = process.env.PORT || 3333;

// route.get('/', (req: Request, res: Response) => {
// 	res.json({ message: 'hello world with Typescript' });
// });

// app.use(route);

_app.default.listen(Number(port), '0.0.0.0', () => {
  console.log('Server listening on port', port);
});
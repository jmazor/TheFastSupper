const { express, bodyParser } = require('./modules');
const authRouter = require('./api/auth');

const app = express();

app.use(bodyParser.json());

app.use(authRouter);

module.exports = app;

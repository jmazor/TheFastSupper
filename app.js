// Sets up an Express app
const { express, bodyParser } = require('./modules');
const authRouter = require('./api/auth');
const userRouter = require('./api/user');

const app = express();

app.use(bodyParser.json());

app.use(authRouter);
app.use(userRouter);

module.exports = app;

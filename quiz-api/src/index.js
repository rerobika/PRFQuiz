import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import routes from './routes';
import cors from 'cors';
import connectDB from './models'

const PORT = 8080;
const TIMEOUT = 5 * 60 * 100;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressSession({secret: 'epicSecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', routes.login);

connectDB().then(async () => {
  app.listen(PORT, () => {
    console.log(`quiz API is listening on port ${PORT}`)
  }).setTimeout(TIMEOUT);
});

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';
import cors from 'cors';
import { connectDB } from './models'
import routes from './routes';

const PORT = 8080;
const TIMEOUT = 5 * 60 * 100;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(expressSession({secret: 'epicSecretKey',
                        resave: false,
                        saveUninitialized: true,
                       }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', routes.login);
app.use('/register', routes.register);
app.use('/tests', routes.tests);
app.use('/quizzes', routes.quizzes);

connectDB().then(async () => {
  var server = app.listen(PORT, () => {
    console.log(`quiz API is listening on port ${PORT}`)
  });
  server.setTimeout(TIMEOUT);
});

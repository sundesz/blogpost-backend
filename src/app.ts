import express, { Application, Request, Response } from 'express';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import cors from 'cors';
import logger from 'morgan';

import { errorHandler, unknownEndpoint } from './middleware';
import { IBlog } from './types/blogs';
import { sequelize } from './db';
import { COOKIE_EXPIRE_TIME, SECRET_KEY } from './config';
import { ISessionData } from './types/session';
import routers from './api/routers';

/**
 * Custom types for Express Request
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      blog?: IBlog;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    isAuth?: boolean;
    views?: number;
    data: ISessionData;
    // cookie?: CookieOptions | undefined;
  }
}

const app: Application = express();
const sequelizeStore = SequelizeStore(session.Store);

const sessionStore = new sequelizeStore({
  db: sequelize,
  table: 'Session',

  checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
  expiration: 60 * 1000, // The maximum age (in milliseconds) of a valid session.
});

const sessionConf = {
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    secure: process.env.NODE_ENV === 'prod',
    sameSite: true,
    maxAge: COOKIE_EXPIRE_TIME,
  },
};

if (app.get('env') === 'prod') {
  app.set('trust proxy', 1); // trust first proxy
  sessionConf.cookie.secure = true;
  app.use(logger('dev'));
}

if (process.env.NODE_ENV === 'dev') {
  app.use(logger('dev'));
}

app.use(session(sessionConf));
app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  if (req.session.views) {
    req.session.views++;
    // req.setHeader('Content-Type', 'text/html');
    // res.write(`<p>views: ${req.session.views}</p>`);
    // res.write(`<p>expires in: ${req.session.cookie.maxAge / 1000}</p>`);
    // res.end();
    res.send(
      `<p>views: ${req.session.views}</p>`
      // `<p>views: ${req.session.views}</p> <br> <p>expires in: ${
      //   req.session.cookie.maxAge / 1000
      // }</p>`
    );
  } else {
    req.session.views = 1;
    res.send('welcome to the session demo. refresh!');
  }
});

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.use('/api/v1/users', routers.user);
app.use('/api/v1/authors', routers.author);
app.use('/api/v1/blogs', routers.blog);
app.use('/api/v1/reactions', routers.reaction);
app.use('/api/v1/comments', routers.comment);
app.use('/api/v1/', routers.auth);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/v1/test', routers.test);
}

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;

// TODO:: hide all react-dev and redux-dev in production mode

// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-namespace
//   namespace NodeJS {
//     interface ProcessEnv {
//       PORT: string;
//       NODE_ENV: 'development' | 'production';
//       DB_URI: string;
//     }
//   }
// }

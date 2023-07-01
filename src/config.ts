import dotenv from 'dotenv';
dotenv.config();

let DB_NAME: string;
let DB_USER: string;
let DB_PASSWORD: string;
let DB_HOST: string;

switch (process.env.NODE_ENV) {
  case 'production':
    DB_NAME = process.env.DB_NAME_PRODUCTION as string;
    DB_USER = process.env.DB_USER_PRODUCTION as string;
    DB_PASSWORD = process.env.DB_PASSWORD_PRODUCTION as string;
    DB_HOST = process.env.DB_HOST_PRODUCTION as string;
    break;
  case 'development':
    DB_NAME = process.env.DB_NAME_DEVELOPMENT as string;
    DB_USER = process.env.DB_USER_DEVELOPMENT as string;
    DB_PASSWORD = process.env.DB_PASSWORD_DEVELOPMENT as string;
    DB_HOST = process.env.DB_HOST_DEVELOPMENT as string;
    break;
  case 'test':
    DB_NAME = process.env.DB_NAME_TEST as string;
    DB_USER = process.env.DB_USER_TEST as string;
    DB_PASSWORD = process.env.DB_PASSWORD_TEST as string;
    DB_HOST = process.env.DB_HOST_TEST as string;
}

const PORT = Number(process.env.PORT) || 8080;
const SALT = process.env.SALT as string;

const PAGE_LIMIT = Number(process.env.PAGE_LIMIT) || 50;
const FILE_SIZE_LIMIT = Number(process.env.FILE_SIZE_LIMIT) || 1024 * 1024;

const SECRET_KEY = process.env.SECRET_KEY as string;
const COOKIE_EXPIRE_TIME = 60 * 60 * 1000; // 60 * 60 *1000;

export {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  PORT,
  SALT,
  PAGE_LIMIT,
  FILE_SIZE_LIMIT,
  SECRET_KEY,
  COOKIE_EXPIRE_TIME,
};

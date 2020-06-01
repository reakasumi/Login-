import dotenv from 'dotenv';

dotenv.config();

const config = Object.freeze({
  app: {
    port: process.env.APP_PORT,
    url: process.env.APP_URL,
    frontEndUrl: process.env.FRONTEND_URL,
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
  },
  crypto: {
    hmacSecret: process.env.HMAC_SECRET_KEY,
  },
  mail: {
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
  },
  facebookAuth: {
    clientID      : process.env.FB_APP_ID, 
    clientSecret  : process.env.FB_API_SECRET, 
    callbackURL   : 'http://localhost:5000/authfacebook/facebook/callback',
   }
});

module.exports = config;
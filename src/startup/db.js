import mongoose from 'mongoose';
import config from '../../config';

async function connect() {
  await mongoose.connect(
    `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,
    {
      // auth: {
      //   user: config.db.username,
      //   password: config.db.password
      // },
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
  );
}

async function disconnect() {
  mongoose.disconnect();
}

const db = Object.freeze({
  connect,
  disconnect,
});

module.exports = db;
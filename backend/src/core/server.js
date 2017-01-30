import Hapi from 'hapi';
import dotenv from 'dotenv';
import db from './db';

dotenv.load({silent: true});

let server = new Hapi.Server();

server.connection({
  host: process.env.SERVER_HOST || 'localhost',
  port: process.env.SERVER_PORT || '8000',
  routes: {
    cors: {
      credentials: true
    }
  }
});

server.on('start', function () {
  db();
});

export default server;

import Promise from 'bluebird';
import boom from 'hapi-boom-decorators';
import server from './server';
import routes from '../modules/pessoa/routes';

module.exports = {start};

function start () {
  return Promise.resolve()
  .then(() => {
    server.register([{
      register: boom
    }], (err) => {
      if (err) throw err;
    });
  })
  .then(() => {
    server.register({
      register: routes
    }, (err) => {
      if (err) throw err;
    });
  })
  .then(() => {
    server.start((err) => {
      if (err) throw err;

      console.log('info', 'Server running at: ' + server.info.uri);
    });
  })
  .catch((err) => {
    console.log('==> App Error: ', err);
    process.exit(1);
  });
}

import * as Controller from './controller';
import * as Validator from './validation';

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/pessoa',
      config: {
        handler: Controller.lista,
        validate: Validator.lista()
      }
    },
    {
      method: 'GET',
      path: '/pessoa/{id}',
      config: {
        handler: Controller.ler,
        validate: Validator.ler()
      }
    },
    {
      method: 'POST',
      path: '/pessoa',
      config: {
        handler: Controller.criar,
        validate: Validator.criar()
      }
    },
    {
      method: 'PUT',
      path: '/pessoa/{id}',
      config: {
        handler: Controller.atualizar,
        validate: Validator.atualizar()
      }
    },
    {
      method: 'DELETE',
      path: '/pessoa/{id}',
      config: {
        handler: Controller.deletar,
        validate: Validator.deletar()
      }
    },
    {
      method: 'POST',
      path: '/sorteio',
      config: {
        handler: Controller.sortear,
        validate: Validator.sortear()
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'pessoa-route',
  version: '1.0.0'
};

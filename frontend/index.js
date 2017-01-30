'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const Good = require('good');
const Path = require('path');

require('dotenv').load({silent: true});

server.connection({
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || 3001,
    routes: {
      cors: true,
      files: {
      	relativeTo: Path.join(__dirname, 'app')
    	}
    }
});

server.register([{
  register: require('inert')
}, ], (err) => {
  if (err)
    console.log('Failed to load'+ err);

  server.route({
    method: 'GET',
    path: '/assets/{path*}',
    handler: {
      directory: {
        path: 'assets'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/src/{path*}',
    handler: {
      directory: {
        path: 'src'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/vendor/{path*}',
    handler: {
      directory: {
        path: 'vendor'
      }
    }
  });    

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: './index.html'
      }
    }
  });
});

const options = {
	ops: {
    interval: 1000
  },
  reporters: {
	  console: [{
	    module: 'good-console'
    }, 'stdout']
  }
};

server.register({
  register: Good,
  options: options
}, function (err) {
  if (err) {
    throw err; 	
  }

  server.start(function () {
      server.log('info', 'Server running at: ' + server.info.uri);
  });
});
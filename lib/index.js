"use strict";

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');
const routes = require('./routes/route');

(async () => {
  const server = await new Hapi.Server({
    host: '127.0.0.1',
    port: 1337
  });

  const swaggerOptions = {
    info: {
      title: 'Test API',
      version: Pack.version,
    },
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);
  server.route([{
    method: 'GET',
    path: '/{file*}',
    handler: {
      directory: {
        path: 'lib/public/html',
        redirectToSlash: true,
        index: true,
      }
    }
  }, {
    method: 'GET',
    path: '/js/{file*}',
    handler: {
      directory: {
        path: 'lib/public/js',
        redirectToSlash: true,
        index: true,
      }
    }
  }]);
  try {
      await server.start();
      console.log('Server running at:', server.info.uri);
  } catch(err) {
      console.log(err);
  }

  // Add all the routes within the routes folder
  for (var route in routes) {
    //Define routes
    server.route(routes[route]);
  }
})();
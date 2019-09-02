"use strict";

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');
const server = Hapi.server({
  host: '127.0.0.1',
  port: 8080
});
const swaggerOptions = {
  info: {
      title: 'Test API Documentation',
      version: Pack.version,
  },
};
const routes = require('./routes/route');
// =============== Routes for our API =======================//
// Add all the routes within the routes folder
for (var route in routes) {
    //Define routes
    server.route(routes[route]);
}
// =============== Start our Server =======================//
async function start() {
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
  }
  catch (err){
    console.log(err);
    process.exit(1);
  }
  console.log(`Server running at: `, server.info.uri);
};
start();

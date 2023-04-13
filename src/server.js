/**
 * 11/04/2023
 * Aplikasi menggunakan port 9000,
 * Host belum ditentukan fleksibel: produksi/development
 */

const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
  });
  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();

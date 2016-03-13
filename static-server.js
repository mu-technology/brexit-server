const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3001 });

server.register(require('inert'), (err) => {
    if (err) { throw err;}

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '../brexit',
                index: true,
                listing: true
            }
        }
    });

    server.start((startErr) => {
        if (startErr) { throw startErr; }

        console.log(`Server running at: ${server.info.uri}`);
    });
});
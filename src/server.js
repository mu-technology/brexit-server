import Hapi from 'hapi';
import hapiAuthJwt from 'hapi-auth-jwt';
import VoteGetRoute from './routes/vote/vote.get.js';
import VoteListRoute from './routes/vote/vote.list.js';
import VotePostRoute from './routes/vote/vote.post.js';
import AuthPostRoute from './routes/auth/auth.post';
import AuthService from './routes/auth/auth.service';

const authService = new AuthService();
const server = new Hapi.Server();
server.connection({
    host: process.env.IP || '0.0.0.0',
    port: process.env.PORT || 3000
});

server.register(hapiAuthJwt, () => {
    server.auth.strategy('token', 'jwt', authService.authStrategy);

    server.route({
        method: 'GET',
        path: '/api/test',
        handler(request, reply) {
            reply({ test: 'test' });
        }
    });

    server.route(new VoteGetRoute());
    server.route(new VoteListRoute());
    server.route(new VotePostRoute());
    server.route(new AuthPostRoute());
});

server.start((err) => {
    if (err) { throw err; }
    console.log(`Server running at: ${server.info.uri}`);
});


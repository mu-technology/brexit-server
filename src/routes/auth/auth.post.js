import Route from '../../shared/route';
import AuthService from './auth.service';

class AuthPostRoute extends Route {

    constructor(method = 'POST', path = '/auth/twitter') {
        super({ method, path });
        this.config = {
            cors: true
        };
    }

    handler(request, reply) {
        const authService = new AuthService(request.payload);
        authService.authenticate().then((data) => {
            reply(data);
        });
    }
}

export default AuthPostRoute;
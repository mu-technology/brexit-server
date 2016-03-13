import Route from '../../shared/route';
import VoteService from './vote.service';

class VoteGetRoute extends Route {

    constructor(method = 'GET', path = '/api/vote') {
        super({ method, path });
        this.config = {
            cors: true,
            auth: 'token'
        };
    }

    handler(request, reply) {
        const voteService = new VoteService();
        const credentials = request.auth.credentials;
        voteService.getVote(credentials).then((vote) => {
            reply({ vote });
        });
    }
}

export default VoteGetRoute;
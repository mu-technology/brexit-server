import Route from '../../shared/route';
import VoteService from './vote.service';

class VotePostRoute extends Route {

    constructor(method = 'POST', path = '/api/vote') {
        super({ method, path });
        this.config = {
            cors: true,
            auth: 'token'
        };
    }

    handler(request, reply) {
        const voteService = new VoteService();
        const credentials = request.auth.credentials;
        const selectedVote = Object.assign({}, JSON.parse(request.payload).vote, {
            date: new Date()
        });
        voteService.saveVote(credentials, selectedVote).then((vote) => reply({ vote }));
    }
}

export default VotePostRoute;
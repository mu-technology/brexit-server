import Route from '../../shared/route';
import VoteService from './vote.service';

class VoteListRoute extends Route {

    constructor(method = 'GET', path = '/api/votes') {
        super({ method, path });
        this.config = {
            cors: true,
            auth: 'token'
        };
    }

    handler(request, reply) {
        const voteService = new VoteService();

        voteService.listVotes().then((votes) => {
            const total = votes.reduce((acc, v) => acc + v.count, 0);

            reply({ votes, total });
        });
    }
}

export default VoteListRoute;
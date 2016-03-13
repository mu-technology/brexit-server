import Redis from '../../shared/redis-db';

class VoteService extends Redis {

    saveVote(user, vote) {
        return this.saveHash(voteHashKey(user.id), vote).then(() => vote, (err) => err);
    }

    getVote(user) {
        return this.getHash(voteHashKey(user.id)).then((vote) => vote);
    }
}

function voteHashKey(id) {
    return `vote:${id}`;
}

export default VoteService;
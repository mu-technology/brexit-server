import { saveHash, getHash } from '../../shared/redis-db';

class VoteService {

    saveVote(user, vote) {
        return saveHash(voteHashKey(user.id), vote).then(() => vote, (err) => err);
    }

    getVote(user) {
        return getHash(voteHashKey(user.id)).then((vote) => vote);
    }
}

function voteHashKey(id) {
    return `vote:${id}`;
}

export default VoteService;
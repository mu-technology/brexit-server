import q from 'q';
import { saveHash, getHash, addMemberToSet, removeMemberFromSet, getIntersectionOfSets, getSetMembersCount } from '../../shared/redis-db';

const VOTE_SETS_IDS = ['vote:1', 'vote:2'];

class VoteService {

    saveVote(user, vote) {
        // vote id = 1 comes in
        // we add it user A to vote:1
        // we get the intersection of vote:1|vote:2
        // if intersection includes user A
        // we remove user A from vote:2
        return addMemberToSet(voteHashKey(vote.id), user.id)
            .then(() => getIntersectionOfSets(VOTE_SETS_IDS))
            .then((intersection) => {
                if (intersection.indexOf(user.id) > -1) {
                    const keySetToRemove = VOTE_SETS_IDS.filter(v => v !== voteHashKey(vote.id))[0];

                    return removeMemberFromSet(keySetToRemove, user.id);
                }
                return q.when(vote);
            })
            .then(() => saveHash(voteHashKey(user.id), vote).then(() => vote, (err) => err));
    }

    getVote(user) {
        return getHash(voteHashKey(user.id)).then((vote) => vote);
    }

    listVotes() {
        const voteCountPromises = VOTE_SETS_IDS.map(key => getSetMembersCount(key));

        return q.all(voteCountPromises)
            .then((result) =>
                VOTE_SETS_IDS.map((k, i) => ({
                    id: i + 1,
                    count: result[i]
                }))
            );
    }
}

function voteHashKey(id) {
    return `vote:${id}`;
}

export default VoteService;
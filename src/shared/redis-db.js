import redis from 'redis';
import q from 'q';
import url from 'url';

const redisClient = createRedisClient();
redisClient.on('error', (err) => console.log(`Error ${err}`));

export function saveHash(key, hash) {
    const deferred = q.defer();

    redisClient.hmset(key, hash, (err, result) => {
        if (err) {
            deferred.reject(`Error saving hash to Redis: ${err}`);
        }

        deferred.resolve(result);
    });

    return deferred.promise;
}

export function getHash(key) {
    const deferred = q.defer();

    redisClient.hgetall(key, (err, result) => {
        if (err) {
            deferred.reject(`Error retrieving hash ${key} from Redis: ${err}`);
        }

        deferred.resolve(result);
    });

    return deferred.promise;
}

export function addMemberToSet(key, member) {
    const deferred = q.defer();

    redisClient.sadd(key, member, (err, result) => {
        if (err) {
            deferred.reject(`Error saving set ${key} from Redis: ${err}`);
        }

        deferred.resolve(result);
    });

    return deferred.promise;
}

export function getSetMembersCount(key) {
    const deferred = q.defer();

    redisClient.scard(key, (err, result) => {
        if (err) {
            deferred.reject(`Error retrieving set ${key} from Redis: ${err}`);
        }

        deferred.resolve(result);
    });

    return deferred.promise;
}

export function getIntersectionOfSets(keys) {
    const deferred = q.defer();

    redisClient.sinter(...keys, (err, result) => {
        if (err) {
            deferred.reject(`Error retrieving intersection from redis: ${err}`);
        }

        deferred.resolve(result);
    });

    return deferred.promise;
}

export function removeMemberFromSet(key, member) {
    const deferred = q.defer();

    redisClient.srem(key, member, (err, result) => {
        if (err) {
            deferred.reject(`Error removing ${member} from set ${key} Redis: ${err}`);
        }

        deferred.resolve(result);
    });

    return deferred.promise;
}

function createRedisClient() {
    let client = null;
    if (process.env.REDISTOGO_URL) {
        const rtg = url.parse(process.env.REDISTOGO_URL);
        client = redis.createClient(rtg.port, rtg.hostname);
        client.auth(rtg.auth.split(':')[1]);
    } else {
        client = redis.createClient();
    }
    return client;
}
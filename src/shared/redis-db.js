import redis from 'redis';
import q from 'q';

class Redis {

    constructor(params = {}) {
        this.client = params.client || redis.createClient();
        this.client.on('error', (err) => console.log(`Error ${err}`));
    }

    saveHash(key, hash) {
        const deferred = q.defer();

        this.client.hmset(key, hash, (err, result) => {
            if (err) {
                deferred.reject(`Error saving hash to Redis: ${err}`);
            }

            deferred.resolve(result);
        });

        return deferred.promise;
    }

    getHash(key) {
        const deferred = q.defer();

        this.client.hgetall(key, (err, result) => {
            if (err) {
                deferred.reject(`Error retrieving hash ${key} from Redis: ${err}`);
            }

            deferred.resolve(result);
        });

        return deferred.promise;
    }

}

export default Redis;
import redis from 'redis';
import q from 'q';
import url from 'url';

class Redis {

    constructor(params = {}) {
        if (process.env.REDISTOGO_URL) {
            const rtg = url.parse(process.env.REDISTOGO_URL);
            this.client = redis.createClient(rtg.port, rtg.hostname);
            this.client.auth(rtg.auth.split(':')[1]);
        } else {
            this.client = params.client || redis.createClient();
        }
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
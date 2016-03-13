import q from 'q';
import qs from 'qs';
import jwt from 'jwt-simple';
import moment from 'moment';
import request from 'request';
import { CONFIG } from '../../config';
import Redis from '../../shared/redis-db';

class AuthService extends Redis {

    constructor(payload = null) {
        super();
        this.payload = JSON.parse(payload);

        this.authStrategy = {
            key: CONFIG.TOKEN_SECRET,
            validateFunc: this.validateUser.bind(this),
            verifyOptions: { algorithms: ['HS256'] }
        };
    }

    authenticate() {
        if (!this.payload.oauth_token || !this.payload.oauth_verifier) {
            return obtainRequestToken(this.payload);
        }

        return obtainAccessToken(this.payload)
            .then((accessToken) => obtainProfileInfo(accessToken))
            .then((user) => createUserAccount.call(this, user))
            .then((user) => ({
                token: createJWT(user),
                data: user
            }));
    }

    validateUser(req, decoded, callback) {
        this.getHash(userHashKey(decoded.sub))
            .then((session) => {
                if (!session) {
                    return callback(null, false);
                }
                return callback(null, true, session);
            }, () => callback(null, false));
    }
}

function obtainRequestToken(payload) {
    const deferred = q.defer();
    const requestTokenOauth = {
        consumer_key: CONFIG.TWITTER_KEY,
        consumer_secret: CONFIG.TWITTER_SECRET,
        callback: payload.redirectUri
    };

    request.post({ url: CONFIG.REQUEST_TOKEN_URL, oauth: requestTokenOauth }, (err, response, oauthToken) => {
        if (err) {
            deferred.reject(err);
        }
        // Step 2. Send OAuth token back to open the authorization screen.
        const parsedOauthToken = qs.parse(oauthToken);
        deferred.resolve(parsedOauthToken);
    });

    return deferred.promise;
}

function obtainAccessToken(payload) {
    const deferred = q.defer();
    const accessTokenOauth = {
        consumer_key: CONFIG.TWITTER_KEY,
        consumer_secret: CONFIG.TWITTER_SECRET,
        token: payload.oauth_token,
        verifier: payload.oauth_verifier
    };

    request.post({ url: CONFIG.ACCESS_TOKEN_URL, oauth: accessTokenOauth }, (err, response, accessToken) => {
        if (err) {
            deferred.reject(err);
        }
        const parsedAccessToken = qs.parse(accessToken);
        deferred.resolve(parsedAccessToken);
    });

    return deferred.promise;
}

function obtainProfileInfo(parsedAccessToken) {
    const deferred = q.defer();
    const profileOauth = {
        consumer_key: CONFIG.TWITTER_KEY,
        consumer_secret: CONFIG.TWITTER_SECRET,
        oauth_token: parsedAccessToken.oauth_token
    };

    // Step 4. Retrieve profile information about the current user.
    request.get({
        url: `${CONFIG.PROFILE_URL}${parsedAccessToken.screen_name}`,
        oauth: profileOauth,
        json: true
    }, (err, response, profile) => {
        if (err) {
            deferred.reject(err);
        }

        const user = {
            id: profile.id,
            twitterHandle: profile.screen_name,
            displayName: profile.name,
            picture: profile.profile_image_url.replace('_normal', '')
        };

        deferred.resolve(user);
    });

    return deferred.promise;
}

function createUserAccount(user) {
    return this.saveHash(userHashKey(user.id), user).then(() => user, (err) => err);
}

function createJWT(user) {
    const payload = {
        sub: user.id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };

    return jwt.encode(payload, CONFIG.TOKEN_SECRET);
}

function userHashKey(id) {
    return `user:${id}`;
}

export default AuthService;
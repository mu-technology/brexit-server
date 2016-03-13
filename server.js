/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _hapi = __webpack_require__(1);
	
	var _hapi2 = _interopRequireDefault(_hapi);
	
	var _hapiAuthJwt = __webpack_require__(2);
	
	var _hapiAuthJwt2 = _interopRequireDefault(_hapiAuthJwt);
	
	var _voteGet = __webpack_require__(3);
	
	var _voteGet2 = _interopRequireDefault(_voteGet);
	
	var _votePost = __webpack_require__(10);
	
	var _votePost2 = _interopRequireDefault(_votePost);
	
	var _auth = __webpack_require__(11);
	
	var _auth2 = _interopRequireDefault(_auth);
	
	var _auth3 = __webpack_require__(12);
	
	var _auth4 = _interopRequireDefault(_auth3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var authService = new _auth4.default();
	var server = new _hapi2.default.Server();
	server.connection({
	    host: process.env.IP || '0.0.0.0',
	    port: process.env.PORT || 3000
	});
	
	server.register(_hapiAuthJwt2.default, function () {
	    server.auth.strategy('token', 'jwt', authService.authStrategy);
	
	    server.route({
	        method: 'GET',
	        path: '/api/test',
	        handler: function handler(request, reply) {
	            reply({ test: 'test' });
	        }
	    });
	
	    server.route(new _voteGet2.default());
	    server.route(new _votePost2.default());
	    server.route(new _auth2.default());
	});
	
	server.start(function (err) {
	    if (err) {
	        throw err;
	    }
	    console.log('Server running at: ' + server.info.uri);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("hapi");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("hapi-auth-jwt");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _route = __webpack_require__(4);
	
	var _route2 = _interopRequireDefault(_route);
	
	var _vote = __webpack_require__(5);
	
	var _vote2 = _interopRequireDefault(_vote);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var VoteGetRoute = function (_Route) {
	    _inherits(VoteGetRoute, _Route);
	
	    function VoteGetRoute() {
	        var method = arguments.length <= 0 || arguments[0] === undefined ? 'GET' : arguments[0];
	        var path = arguments.length <= 1 || arguments[1] === undefined ? '/api/vote' : arguments[1];
	
	        _classCallCheck(this, VoteGetRoute);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VoteGetRoute).call(this, { method: method, path: path }));
	
	        _this.config = {
	            cors: true,
	            auth: 'token'
	        };
	        return _this;
	    }
	
	    _createClass(VoteGetRoute, [{
	        key: 'handler',
	        value: function handler(request, reply) {
	            var voteService = new _vote2.default();
	            var credentials = request.auth.credentials;
	            voteService.getVote(credentials).then(function (vote) {
	                reply({ vote: vote });
	            });
	        }
	    }]);
	
	    return VoteGetRoute;
	}(_route2.default);
	
	exports.default = VoteGetRoute;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Route = function () {
	    function Route() {
	        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        _classCallCheck(this, Route);
	
	        this.method = params.method;
	        this.path = params.path;
	    }
	
	    _createClass(Route, [{
	        key: 'handler',
	        value: function handler(request, reply) {
	            reply('Hello!');
	        }
	    }]);
	
	    return Route;
	}();
	
	exports.default = Route;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _redisDb = __webpack_require__(6);
	
	var _redisDb2 = _interopRequireDefault(_redisDb);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var VoteService = function (_Redis) {
	    _inherits(VoteService, _Redis);
	
	    function VoteService() {
	        _classCallCheck(this, VoteService);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(VoteService).apply(this, arguments));
	    }
	
	    _createClass(VoteService, [{
	        key: 'saveVote',
	        value: function saveVote(user, vote) {
	            return this.saveHash(voteHashKey(user.id), vote).then(function () {
	                return vote;
	            }, function (err) {
	                return err;
	            });
	        }
	    }, {
	        key: 'getVote',
	        value: function getVote(user) {
	            return this.getHash(voteHashKey(user.id)).then(function (vote) {
	                return vote;
	            });
	        }
	    }]);
	
	    return VoteService;
	}(_redisDb2.default);
	
	function voteHashKey(id) {
	    return 'vote:' + id;
	}
	
	exports.default = VoteService;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _redis = __webpack_require__(7);
	
	var _redis2 = _interopRequireDefault(_redis);
	
	var _q = __webpack_require__(8);
	
	var _q2 = _interopRequireDefault(_q);
	
	var _url = __webpack_require__(9);
	
	var _url2 = _interopRequireDefault(_url);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Redis = function () {
	    function Redis() {
	        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        _classCallCheck(this, Redis);
	
	        if (process.env.REDISTOGO_URL) {
	            var rtg = _url2.default.parse(process.env.REDISTOGO_URL);
	            this.client = _redis2.default.createClient(rtg.port, rtg.hostname);
	            this.client.auth(rtg.auth.split(':')[1]);
	        } else {
	            this.client = params.client || _redis2.default.createClient();
	        }
	        this.client.on('error', function (err) {
	            return console.log('Error ' + err);
	        });
	    }
	
	    _createClass(Redis, [{
	        key: 'saveHash',
	        value: function saveHash(key, hash) {
	            var deferred = _q2.default.defer();
	
	            this.client.hmset(key, hash, function (err, result) {
	                if (err) {
	                    deferred.reject('Error saving hash to Redis: ' + err);
	                }
	
	                deferred.resolve(result);
	            });
	
	            return deferred.promise;
	        }
	    }, {
	        key: 'getHash',
	        value: function getHash(key) {
	            var deferred = _q2.default.defer();
	
	            this.client.hgetall(key, function (err, result) {
	                if (err) {
	                    deferred.reject('Error retrieving hash ' + key + ' from Redis: ' + err);
	                }
	
	                deferred.resolve(result);
	            });
	
	            return deferred.promise;
	        }
	    }]);
	
	    return Redis;
	}();
	
	exports.default = Redis;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("redis");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("q");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _route = __webpack_require__(4);
	
	var _route2 = _interopRequireDefault(_route);
	
	var _vote = __webpack_require__(5);
	
	var _vote2 = _interopRequireDefault(_vote);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var VotePostRoute = function (_Route) {
	    _inherits(VotePostRoute, _Route);
	
	    function VotePostRoute() {
	        var method = arguments.length <= 0 || arguments[0] === undefined ? 'POST' : arguments[0];
	        var path = arguments.length <= 1 || arguments[1] === undefined ? '/api/vote' : arguments[1];
	
	        _classCallCheck(this, VotePostRoute);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VotePostRoute).call(this, { method: method, path: path }));
	
	        _this.config = {
	            cors: true,
	            auth: 'token'
	        };
	        return _this;
	    }
	
	    _createClass(VotePostRoute, [{
	        key: 'handler',
	        value: function handler(request, reply) {
	            var voteService = new _vote2.default();
	            var credentials = request.auth.credentials;
	            var selectedVote = Object.assign({}, JSON.parse(request.payload).vote, {
	                date: new Date()
	            });
	            voteService.saveVote(credentials, selectedVote).then(function (vote) {
	                return reply({ vote: vote });
	            });
	        }
	    }]);
	
	    return VotePostRoute;
	}(_route2.default);
	
	exports.default = VotePostRoute;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _route = __webpack_require__(4);
	
	var _route2 = _interopRequireDefault(_route);
	
	var _auth = __webpack_require__(12);
	
	var _auth2 = _interopRequireDefault(_auth);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AuthPostRoute = function (_Route) {
	    _inherits(AuthPostRoute, _Route);
	
	    function AuthPostRoute() {
	        var method = arguments.length <= 0 || arguments[0] === undefined ? 'POST' : arguments[0];
	        var path = arguments.length <= 1 || arguments[1] === undefined ? '/auth/twitter' : arguments[1];
	
	        _classCallCheck(this, AuthPostRoute);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AuthPostRoute).call(this, { method: method, path: path }));
	
	        _this.config = {
	            cors: true
	        };
	        return _this;
	    }
	
	    _createClass(AuthPostRoute, [{
	        key: 'handler',
	        value: function handler(request, reply) {
	            var authService = new _auth2.default(request.payload);
	            authService.authenticate().then(function (data) {
	                reply(data);
	            });
	        }
	    }]);
	
	    return AuthPostRoute;
	}(_route2.default);
	
	exports.default = AuthPostRoute;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _q = __webpack_require__(8);
	
	var _q2 = _interopRequireDefault(_q);
	
	var _qs = __webpack_require__(13);
	
	var _qs2 = _interopRequireDefault(_qs);
	
	var _jwtSimple = __webpack_require__(14);
	
	var _jwtSimple2 = _interopRequireDefault(_jwtSimple);
	
	var _moment = __webpack_require__(15);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _request = __webpack_require__(16);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _config = __webpack_require__(17);
	
	var _redisDb = __webpack_require__(6);
	
	var _redisDb2 = _interopRequireDefault(_redisDb);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AuthService = function (_Redis) {
	    _inherits(AuthService, _Redis);
	
	    function AuthService() {
	        var payload = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	        _classCallCheck(this, AuthService);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AuthService).call(this));
	
	        _this.payload = JSON.parse(payload);
	
	        _this.authStrategy = {
	            key: _config.CONFIG.TOKEN_SECRET,
	            validateFunc: _this.validateUser.bind(_this),
	            verifyOptions: { algorithms: ['HS256'] }
	        };
	        return _this;
	    }
	
	    _createClass(AuthService, [{
	        key: 'authenticate',
	        value: function authenticate() {
	            var _this2 = this;
	
	            if (!this.payload.oauth_token || !this.payload.oauth_verifier) {
	                return obtainRequestToken(this.payload);
	            }
	
	            return obtainAccessToken(this.payload).then(function (accessToken) {
	                return obtainProfileInfo(accessToken);
	            }).then(function (user) {
	                return createUserAccount.call(_this2, user);
	            }).then(function (user) {
	                return {
	                    token: createJWT(user),
	                    data: user
	                };
	            });
	        }
	    }, {
	        key: 'validateUser',
	        value: function validateUser(req, decoded, callback) {
	            this.getHash(userHashKey(decoded.sub)).then(function (session) {
	                if (!session) {
	                    return callback(null, false);
	                }
	                return callback(null, true, session);
	            }, function () {
	                return callback(null, false);
	            });
	        }
	    }]);
	
	    return AuthService;
	}(_redisDb2.default);
	
	function obtainRequestToken(payload) {
	    var deferred = _q2.default.defer();
	    var requestTokenOauth = {
	        consumer_key: _config.CONFIG.TWITTER_KEY,
	        consumer_secret: _config.CONFIG.TWITTER_SECRET,
	        callback: payload.redirectUri
	    };
	
	    _request2.default.post({ url: _config.CONFIG.REQUEST_TOKEN_URL, oauth: requestTokenOauth }, function (err, response, oauthToken) {
	        if (err) {
	            deferred.reject(err);
	        }
	        // Step 2. Send OAuth token back to open the authorization screen.
	        var parsedOauthToken = _qs2.default.parse(oauthToken);
	        deferred.resolve(parsedOauthToken);
	    });
	
	    return deferred.promise;
	}
	
	function obtainAccessToken(payload) {
	    var deferred = _q2.default.defer();
	    var accessTokenOauth = {
	        consumer_key: _config.CONFIG.TWITTER_KEY,
	        consumer_secret: _config.CONFIG.TWITTER_SECRET,
	        token: payload.oauth_token,
	        verifier: payload.oauth_verifier
	    };
	
	    _request2.default.post({ url: _config.CONFIG.ACCESS_TOKEN_URL, oauth: accessTokenOauth }, function (err, response, accessToken) {
	        if (err) {
	            deferred.reject(err);
	        }
	        var parsedAccessToken = _qs2.default.parse(accessToken);
	        deferred.resolve(parsedAccessToken);
	    });
	
	    return deferred.promise;
	}
	
	function obtainProfileInfo(parsedAccessToken) {
	    var deferred = _q2.default.defer();
	    var profileOauth = {
	        consumer_key: _config.CONFIG.TWITTER_KEY,
	        consumer_secret: _config.CONFIG.TWITTER_SECRET,
	        oauth_token: parsedAccessToken.oauth_token
	    };
	
	    // Step 4. Retrieve profile information about the current user.
	    _request2.default.get({
	        url: '' + _config.CONFIG.PROFILE_URL + parsedAccessToken.screen_name,
	        oauth: profileOauth,
	        json: true
	    }, function (err, response, profile) {
	        if (err) {
	            deferred.reject(err);
	        }
	
	        var user = {
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
	    return this.saveHash(userHashKey(user.id), user).then(function () {
	        return user;
	    }, function (err) {
	        return err;
	    });
	}
	
	function createJWT(user) {
	    var payload = {
	        sub: user.id,
	        iat: (0, _moment2.default)().unix(),
	        exp: (0, _moment2.default)().add(14, 'days').unix()
	    };
	
	    return _jwtSimple2.default.encode(payload, _config.CONFIG.TOKEN_SECRET);
	}
	
	function userHashKey(id) {
	    return 'user:' + id;
	}
	
	exports.default = AuthService;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("qs");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("jwt-simple");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var CONFIG = exports.CONFIG = {
	    REQUEST_TOKEN_URL: 'https://api.twitter.com/oauth/request_token',
	    ACCESS_TOKEN_URL: 'https://api.twitter.com/oauth/access_token',
	    PROFILE_URL: 'https://api.twitter.com/1.1/users/show.json?screen_name=',
	
	    // App Settings
	    TOKEN_SECRET: process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET',
	
	    // OAuth 1.0
	    TWITTER_KEY: process.env.TWITTER_KEY || 'VAaXxYKOsNgE1KaFUfsFdVpBn',
	    TWITTER_SECRET: process.env.TWITTER_SECRET || 'vcjDy4ZkEzpmSpIc1iQcRH76GemJGGGPWXoSarRS7JE4JEZrvY'
	};

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map
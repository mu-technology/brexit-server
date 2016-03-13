export const CONFIG = {
    REQUEST_TOKEN_URL: 'https://api.twitter.com/oauth/request_token',
    ACCESS_TOKEN_URL: 'https://api.twitter.com/oauth/access_token',
    PROFILE_URL: 'https://api.twitter.com/1.1/users/show.json?screen_name=',

    // App Settings
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET',

    // OAuth 1.0
    TWITTER_KEY: process.env.TWITTER_KEY || 'VAaXxYKOsNgE1KaFUfsFdVpBn',
    TWITTER_SECRET: process.env.TWITTER_SECRET || 'vcjDy4ZkEzpmSpIc1iQcRH76GemJGGGPWXoSarRS7JE4JEZrvY'
};
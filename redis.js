const redis = require('redis'),
      redisClient = redis.createClient();
      //RedisStore = require('connect-redis')(session),
      //redisStore = new RedisStore({client: redisClient});

module.exports = () => {
    redisClient.on('connect',function(){
        console.log('Connected to Redis.....');
    });

}
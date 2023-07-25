const { Redis } =  require('@upstash/redis')
const { Ratelimit } = require('@upstash/ratelimit');

let redis;
let ratelimit;

if (process.env.NODE_ENV === 'production') {
  redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN,
    onConnectionError: (err) => {
      console.log('Redis connection error: ' + err);
    },
  });

  ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(15, '10s'),
    //analytics: true,
    //prefix: '@upstash/ratelimit',
  });
}

exports.redis = redis;
exports.ratelimit = ratelimit;






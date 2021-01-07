// const redis = require('redis'); //On importe redis
// const mongoose = require('mongoose') //On importe mongoose
// const {RateLimiterRedis} = require('rate-limiter-flexible');

// const mongooseClient = mongoose.createClient({
//   host: 'mongoose',
//   port: 6379,
//   enable_offline_queue: false,
// });

// const rateLimiter = new RateLimiterRedis({
//   storeClient: mongooseClient,
//   keyPrefix: 'middleware',
//   points: 10, // 10 requêtes
//   duration: 1, // par 1seconde/IP
// });

// const rateLimiterMiddleware = (req, res, next) => {
//   rateLimiter.consume(req.ip)
//     .then(() => {
//       next();
//     })
//     .catch(() => {
//       res.status(429).send('Trop de requête');
//     });
// };

// module.exports = rateLimiterMiddleware;
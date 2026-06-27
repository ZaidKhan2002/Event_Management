require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  jwt: {
    secret: process.env.JWT_SECRET || 'secret_key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  cache: {
    ttlSeconds: parseInt(process.env.CACHE_TTL_SECONDS) || 60,
  },
  dataDir: require('path').join(__dirname, '../data'),
};

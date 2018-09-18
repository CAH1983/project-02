// ~~~~~~~~~~~~~~~ ENVIRONMENT ~~~~~~~~~~~~~~~~~~~~~

const port = process.env.PORT || 4000;
const dbURI = 'mongodb://localhost:27017/instaclone';

// ========== module exports ==========
module.exports = { port, dbURI };

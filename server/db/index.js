const { Pool } = require('pg')
const dbConfig = require('./config');

const pool = new Pool(dbConfig);

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}
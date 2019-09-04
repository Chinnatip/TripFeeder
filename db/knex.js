const config = require('./config')

module.exports = require('knex')({
  client: 'pg',
  connection: config
})

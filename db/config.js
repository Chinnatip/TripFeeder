require('dotenv-flow').config()

module.exports = {
  version: process.env.VERSION,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
}

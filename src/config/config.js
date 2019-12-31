// config.js
const env = process.env.NODE_ENV // 'dev' or 'test' or 'prod'

const dev = {
  app: {
    host: 'localhost',
    port: 8080
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'db'
  }
}

const prod = {
  app: {
    host: 'localhost',
    port: 8080
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'test'
  }
}

const test = {
  app: {
    host: 'localhost',
    port: 8080
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'test'
  }
}

const config = {
  dev,
  prod,
  test
}

module.exports = config[env]

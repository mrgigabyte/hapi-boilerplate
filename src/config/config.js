// config.js
const env = process.env.NODE_ENV // 'dev' or 'test' or 'prod'

const dev = {
  server: {
    host: 'localhost',
    port: 8080,
    plugins: [
      'swagger'
    ]
  },
  database: {
    host: 'localhost',
    port: 5432,
    name: 'mrgigabyte',
    username: 'mrgigabyte',
    password: 'abc@123',
    pool: {
      min: 0,
      max: 10,
      acquire: 30000,
      idle: 1000
    },
    dialect: 'postgres'
  }
}

const prod = {
  server: {
    host: 'localhost',
    port: 8080,
    plugins: [
      'swagger'
    ]
  },
  database: {
    host: 'localhost',
    port: 5432,
    name: 'mrgigabyte',
    username: 'mrgigabyte',
    password: 'abc@123',
    pool: {
      min: 10,
      max: 0,
      acquire: 30000,
      idle: 1000
    },
    dialect: 'postgres'
  }
}

const test = {
  server: {
    host: 'localhost',
    port: 8080,
    plugins: [
      'swagger'
    ]
  },
  database: {
    host: 'localhost',
    port: 5432,
    name: 'mrgigabyte',
    username: 'mrgigabyte',
    password: 'abc@123',
    pool: {
      min: 10,
      max: 0,
      acquire: 30000,
      idle: 1000
    },
    dialect: 'postgres'
  }
}

const config = {
  dev,
  prod,
  test
}

module.exports = config[env]

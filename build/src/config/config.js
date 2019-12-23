"use strict";

// config.js
var env = process.env.NODE_ENV; // 'dev' or 'test'

var dev = {
  app: {
    host: 'localhost',
    port: 3000
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'db'
  }
};
var test = {
  app: {
    host: 'localhost',
    port: 3000
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'test'
  }
};
var config = {
  dev: dev,
  test: test
};
module.exports = config[env];
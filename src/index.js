const { start } = require('./server')
const { logger } = require('winston')

try {
  start()
} catch (err) {
  console.log(err)
  logger.error(err)
  process.exit(1)
}

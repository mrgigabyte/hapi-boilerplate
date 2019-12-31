const winston = require('winston')
// const timestamp = () => +new Date()

const timezoned = () => {
  return new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata'
  })
}

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp({ format: timezoned }), winston.format.json()),
  transports: [new winston.transports.File({ filename: 'app.log' })]
})

// logger.info('What rolls down stairs')
// logger.info('alone or in pairs,')
// logger.info('and over your neighbors dog?')
// logger.warn('Whats great for a snack,')
// logger.info('And fits on your back?')
// logger.error('Its log, log, log')

if (process.env.NODE_ENV !== 'prod') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(winston.format.timestamp({ format: timezoned }), winston.format.colorize(), winston.format.simple())
  }))
}

export default logger

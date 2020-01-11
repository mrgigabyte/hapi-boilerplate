const bcrypt = require('bcrypt')

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(password, salt)
}

module.exports = {
  hashPassword
}

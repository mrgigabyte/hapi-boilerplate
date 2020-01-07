const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')

module.exports = (sequelize, type) => {
  const User = sequelize.define('user', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING,
      notNull: true
    },
    username: {
      type: type.STRING,
      uniqueKey: true,
      notNull: true

    },
    email: {
      type: type.STRING,
      isEmail: true,
      notNull: true

    },
    password: {
      type: type.STRING,
      notNull: true
    },
    roles: {
      type: type.STRING,
      notNull: false
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(user.password, salt)
      }
    },
    indexes: [
      {
        unique: true,
        fields: ['username', 'email']
      }
    ]
  })

  User.prototype.generateJWT = function () {
    var today = new Date()
    var exp = new Date(today)
    exp.setDate(today.getDate() + 60)

    return jwt.sign({
      email: this.email,
      password: this.password,
      exp: parseInt(exp.getTime() / 1000)
    }, config.auth.secret, { algorithm: config.auth.algorithm })
  }

  User.prototype.validPassword = function (password) {
    console.log(password, this.password)
    return bcrypt.compareSync(password, this.password)
  }

  User.prototype.toAuthJSON = function () {
    return {
      username: this.username,
      email: this.email,
      token: this.generateJWT()
    }
  }

  return User
}

const bcrypt = require('bcrypt')

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

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }

  return User
}

module.exports = (sequelize, type) => {
  return sequelize.define('user', {
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
    indexes: [
      {
        unique: true,
        fields: ['username']
      }
    ]
  })
}

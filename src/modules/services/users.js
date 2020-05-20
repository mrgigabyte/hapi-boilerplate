const helpers = require('./helpers')

module.exports = (userModel) => {
  const User = userModel

  async function createUser (payload) {
    const user = {}
    user.email = payload.user.email
    user.name = payload.user.name
    user.username = payload.user.username
    user.password = payload.user.password

    return User.create(user)
  }

  async function getUserByEmail (email) {
    return User.findOne({ where: { email: email } })
  }

  async function updateUser (authUser, payload) {
    const user = {}

    if (payload.user.email) {
      user.email = payload.user.email
    }
    if (payload.user.name) {
      user.name = payload.user.name
    }
    if (payload.user.username) {
      user.username = payload.user.username
    }
    if (payload.user.password) {
      user.password = helpers.hashPassword(payload.user.password)
    }

    return User.update(user, { where: { email: authUser.email } })
  }

  async function deleteUser (authUser) {
    return User.destroy({ where: { id: authUser.id, username: authUser.username } })
  }

  return [
    {
      name: 'services.users.create',
      method: createUser
    },
    {
      name: 'services.users.getByEmail',
      method: getUserByEmail
    },
    {
      name: 'services.users.updateUser',
      method: updateUser
    },
    {
      name: 'services.users.deleteUser',
      method: deleteUser
    }]
}

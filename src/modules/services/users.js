module.exports = (userModel) => {
  const User = userModel

  async function createUser (payload) {
    const user = {}

    user.email = payload.user.email
    user.name = payload.user.name
    user.username = payload.user.username
    user.password = payload.user.password

    try {
      const status = await User.create(user)
      return status
    } catch (err) {
      throw err.errors
    }
  }

  async function getUserByEmail (email) {
    try {
      const user = await User.findOne({ where: { email: email } })
      return user
    } catch (err) {
      console.log(err)
      throw err.errors
    }
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
      user.username = payload.user.password
    }

    try {
      console.log(authUser)
      const status = await User.update(user, { where: { email: authUser.email } })
      return status
    } catch (err) {
      console.log(err)
      throw err.errors
    }
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
    }]
}

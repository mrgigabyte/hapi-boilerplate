module.exports = (userModel) => {
  const User = userModel

  async function createUser (payload) {
    // let user = new User()
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
      return err.errors
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
    }]
}

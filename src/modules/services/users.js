module.exports = (userModel) => {
  const User = userModel

  function createUser (payload) {
    // let user = new User()
    const user = {}

    user.email = payload.user.email
    user.name = payload.user.name
    user.username = payload.user.username
    user.password = payload.user.password

    console.log('@@@@@')
    console.log(User, user)
    console.log('@@@@@')

    // return User.create(user).then((user)=>{
    //     return user
    // }).catch((err)=>{
    //     return err})

    // user.save((err, user) => {
    //   if (err) return callback(err, null)
    //   return callback(null, user)
    // })
  }

  return [
    {
      name: 'services.users.create',
      method: createUser
    }]
}

module.exports = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    const User = server.methods.models().user

    const services = [].concat(
      require('./users')(User)
    )

    server.method(services)
  }
}

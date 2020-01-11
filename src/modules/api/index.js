module.exports = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    await server.register(require('./users'))
  }
}

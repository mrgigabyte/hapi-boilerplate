// const { readdirSync } = require('fs')

// const getDirectories = source =>
//   readdirSync(source, { withFileTypes: true })
//     .filter(dirent => dirent.isDirectory())
//     .map(dirent => dirent.name)

// const APIs = []

module.exports = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    await server.register(require('./users'))
  }
}

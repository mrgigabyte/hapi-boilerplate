const HapiSwagger = require('hapi-swagger')
const Pack = require('../../../../package.json')

const swaggerOptions = {
  info: {
    title: Pack.name,
    version: Pack.version
  }
}

export default () => {
  return {
    register: () => {
      return {
        plugin: HapiSwagger,
        options: swaggerOptions
      }
    },
    info: () => {
      return {
        name: 'Hapi-Swagger',
        // version: Pack.depenencies['hapi - swagger']
        version: '1.0.0'
      }
    }
  }
}

const HapiSwagger = require('hapi-swagger')
const Pack = require('../../../../package.json')

const swaggerOptions = {
  info: {
    title: Pack.name,
    version: Pack.version
  },

  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  // },
  security: [{ jwt: [] }]
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
        version: Pack.dependencies['hapi-swagger']
      }
    }
  }
}

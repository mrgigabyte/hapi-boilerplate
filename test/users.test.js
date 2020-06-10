const Code = require('@hapi/code')
const Lab = require('@hapi/lab')
const Server = require('../src/server')

const {
  afterEach,
  beforeEach, describe, it
} = exports.lab = Lab.script()
const { expect } = Code

describe('Deployment', () => {
  let server
  beforeEach(async () => {
    server = await Server.start()
  })

  afterEach(async () => {
    await server.stop()
  })

  it('responds with 201', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/user',
      payload: {
        user: {
          name: 'string',
          username: 'string',
          email: 'string@string.com',
          password: 'string'
        }
      }
    })

    expect(res.statusCode).to.equal(201)
  })
})

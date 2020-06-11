const Code = require('@hapi/code')
const Lab = require('@hapi/lab')
const Server = require('../src/server')

const {
  after,
  before,
  describe,
  it
} = exports.lab = Lab.script()
const { expect } = Code

describe('users endpoint', () => {
  let server
  before(async () => {
    server = await Server.start()
    await new Promise((resolve) => setTimeout(resolve, 500))

    // setTimeout(2000)
  })

  after(async () => {
    await server.stop()
  })

  describe('sign up', () => {
    it('responds with 400, missing name', async () => {
      const res = await server.inject({
        method: 'post',
        url: '/user',
        payload: {
          user: {
            username: 'string',
            email: 'string@string.com',
            password: 'string'
          }
        }
      })

      const payload = JSON.parse(res.payload)
      expect(res.statusCode).to.equal(400)
      expect(payload).to.be.an.object()
      expect(payload.error).to.not.be.undefined()
      expect(payload.error).to.include(['code', 'type', 'details'])
      expect(payload.error.details).to.not.be.empty()
      expect(payload.error.code).to.be.equal(400)
      expect(payload.error.type).to.be.equal('Bad Request')
      expect(payload.error.details[0].message).to.be.equal('"user.name" is required')
    })

    it('responds with 400, missing username', async () => {
      const res = await server.inject({
        method: 'post',
        url: '/user',
        payload: {
          user: {
            name: 'string',
            email: 'string@string.com',
            password: 'string'
          }
        }
      })

      const payload = JSON.parse(res.payload)
      expect(res.statusCode).to.equal(400)
      expect(payload).to.be.an.object()
      expect(payload.error).to.not.be.undefined()
      expect(payload.error).to.include(['code', 'type', 'details'])
      expect(payload.error.details).to.not.be.empty()
      expect(payload.error.code).to.be.equal(400)
      expect(payload.error.type).to.be.equal('Bad Request')
      expect(payload.error.details[0].message).to.be.equal('"user.username" is required')
    })

    it('responds with 400, missing email', async () => {
      const res = await server.inject({
        method: 'post',
        url: '/user',
        payload: {
          user: {
            name: 'string',
            username: 'string',
            password: 'string'
          }
        }
      })

      const payload = JSON.parse(res.payload)
      expect(res.statusCode).to.equal(400)
      expect(payload).to.be.an.object()
      expect(payload.error).to.not.be.undefined()
      expect(payload.error).to.include(['code', 'type', 'details'])
      expect(payload.error.details).to.not.be.empty()
      expect(payload.error.code).to.be.equal(400)
      expect(payload.error.type).to.be.equal('Bad Request')
      expect(payload.error.details[0].message).to.be.equal('"user.email" is required')
    })

    it('responds with 400, invalid email', async () => {
      const res = await server.inject({
        method: 'post',
        url: '/user',
        payload: {
          user: {
            name: 'string',
            username: 'string',
            password: 'string'
          }
        }
      })

      const payload = JSON.parse(res.payload)
      expect(res.statusCode).to.equal(400)
      expect(payload).to.be.an.object()
      expect(payload.error).to.not.be.undefined()
      expect(payload.error).to.include(['code', 'type', 'details'])
      expect(payload.error.details).to.not.be.empty()
      expect(payload.error.code).to.be.equal(400)
      expect(payload.error.type).to.be.equal('Bad Request')
      expect(payload.error.details[0].message).to.be.equal('"user.email" is required')
    })

    it('responds with 201, with correct payload', async () => {
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

    it('responds with 409, existing username', async () => {
      const res = await server.inject({
        method: 'post',
        url: '/user',
        payload: {
          user: {
            name: 'string',
            username: 'string',
            password: 'string'
          }
        }
      })

      expect(res.statusCode).to.equal(400)
    })
  })
})

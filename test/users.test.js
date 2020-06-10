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

            expect(res.statusCode).to.equal(400)
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

            expect(res.statusCode).to.equal(400)
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

            expect(res.statusCode).to.equal(400)
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
    })
})

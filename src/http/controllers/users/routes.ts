import type { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { register } from './register'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  /** Authorized */
  // TODO: Get User profile route
  // app.get('/me', { onRequest: [verifyJWT] }, profile)
}

import { FastifyInstance } from 'fastify'

import { authenticate } from './controllers/authenticate'
import { refresh } from './controllers/refresh'
import { register } from './controllers/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  /** Authorized */
}

import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'

export async function postRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/posts', create)
}

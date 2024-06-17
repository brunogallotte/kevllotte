import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { authenticateBodySchema, registerBodySchema } from '@/http/schemas'

import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { register } from './register'

export async function userRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['authenticate'],
        summary: 'Register a new user',
        body: registerBodySchema,
        response: {
          201: z.null(),
        },
      },
    },
    register,
  )
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions',
    {
      schema: {
        tags: ['authenticate'],
        summary: 'Authenticate a user',
        security: [{ bearerAuth: [] }],
        body: authenticateBodySchema,
        response: {
          200: z.object({
            token: z.string(),
          }),
        },
      },
    },
    authenticate,
  )
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/token/refresh',
    {
      schema: {
        tags: ['authenticate'],
        summary: 'Refresh a user token',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            token: z.string(),
          }),
        },
      },
    },
    refresh,
  )

  /** Authorized */
  // TODO: Get User profile route
  // app.get('/me', { onRequest: [verifyJWT] }, profile)
}

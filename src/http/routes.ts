import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { authenticate } from './controllers/authenticate'
import { refresh } from './controllers/refresh'
import { register } from './controllers/register'
import { authenticateBodySchema, registerBodySchema } from './schemas'

export async function appRoutes(app: FastifyInstance) {
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
  app.post(
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
  app.patch(
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
}

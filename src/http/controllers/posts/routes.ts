import type { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { createPostBodySchema } from './schemas'

export async function postRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post(
    '/posts',
    {
      schema: {
        tags: ['posts'],
        summary: 'Create a post',
        security: [{ bearerAuth: [] }],
        body: createPostBodySchema,
        response: {
          201: z.null(),
        },
      },
    },
    create,
  )
}

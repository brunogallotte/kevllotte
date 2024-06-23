import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { auth } from '../../middlewares/auth'
import { create } from './create'
import { createPostBodySchema, editPostBodySchema } from './schemas'

export async function postRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/posts',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Create a post',
          security: [{ bearerAuth: [] }],
          body: createPostBodySchema,
        },
      },
      create,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/posts/edit',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Create a post',
          security: [{ bearerAuth: [] }],
          body: editPostBodySchema,
        },
      },
      create,
    )
}

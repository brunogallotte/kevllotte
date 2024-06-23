import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '../../middlewares/auth'
import { authenticate } from './authenticate'
import { deleteUser } from './delete'
import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'
import { authenticateBodySchema, registerBodySchema } from './schemas'

export async function userRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['Authentication'],
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
        tags: ['Authentication'],
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
        tags: ['Authentication'],
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
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/me',
      {
        schema: {
          tags: ['Users'],
          summary: 'Get user profile details',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              user: z.object({
                id: z.string().uuid(),
                name: z.string(),
                email: z.string().email(),
                bio: z.string().nullish(),
                avatarUrl: z.string().nullish(),
                linkedinUrl: z.string().nullish(),
                githubUrl: z.string().nullish(),
                instagramUrl: z.string().nullish(),
                twitterUrl: z.string().nullish(),
                websiteUrl: z.string().nullish(),
                password: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            }),
            400: z.object({
              message: z.string(),
            }),
          },
        },
      },
      profile,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/users/delete',
      {
        schema: {
          tags: ['Users'],
          summary: 'Delete user',
          security: [{ bearerAuth: [] }],
          response: {
            201: z.null(),
            400: z.object({
              message: z.string(),
            }),
          },
        },
      },
      deleteUser,
    )
}

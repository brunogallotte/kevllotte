import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '../../middlewares/auth'
import { paginationQuerySchema } from '../schemas'
import { authenticate } from './authenticate'
import { deleteUser } from './delete'
import { edit } from './edit'
import { fetchAuthorFollowers } from './fetch-author-followers'
import { fetchAuthorFollowings } from './fetch-author-followings'
import { fetchPosts } from './fetch-author-posts'
import { followAuthor } from './follow-author'
import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'
import { report } from './report'
import {
  authenticateAuthorBodySchema,
  createReportBodySchema,
  followAuthorParamsSchema,
  registerAuthorBodySchema,
  unfollowAuthorParamsSchema,
} from './schemas'
import { unfollowAuthor } from './unfollow-author'

export async function userRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['Authentication'],
        summary: 'Register a new user',
        body: registerAuthorBodySchema,
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
        body: authenticateAuthorBodySchema,
        response: {
          200: z.object({
            accessToken: z.string(),
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
              author: z.object({
                id: z.string().uuid(),
                name: z.string(),
                username: z.string(),
                email: z.string().email(),
                bio: z.string().nullish(),
                avatarUrl: z.string().nullish(),
                linkedinUrl: z.string().nullish(),
                githubUrl: z.string().nullish(),
                instagramUrl: z.string().nullish(),
                twitterUrl: z.string().nullish(),
                websiteUrl: z.string().nullish(),
                createdAt: z.date(),
                updatedAt: z.date().optional(),
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
    .delete(
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

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/users/edit',
      {
        schema: {
          tags: ['Users'],
          summary: 'Edit user',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              author: z.object({
                id: z.string().uuid(),
                name: z.string(),
                username: z.string(),
                email: z.string(),
                bio: z.string().optional(),
                linkedinUrl: z.string().optional(),
                githubUrl: z.string().optional(),
                instagramUrl: z.string().optional(),
                twitterUrl: z.string().optional(),
                websiteUrl: z.string().optional(),
                avatarUrl: z.string().optional(),
                createdAt: z.date(),
                updatedAt: z.date().optional(),
              }),
            }),
            400: z.object({
              message: z.string(),
            }),
          },
        },
      },
      edit,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/users/posts',
      {
        schema: {
          tags: ['Users'],
          summary: 'Fetch user posts',
          security: [{ bearerAuth: [] }],
        },
      },
      fetchPosts,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/users/report',
      {
        schema: {
          tags: ['Users'],
          summary: 'Report a user',
          security: [{ bearerAuth: [] }],
          body: createReportBodySchema,
        },
      },
      report,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/users/follow/:followingAuthorId',
      {
        schema: {
          tags: ['Users'],
          summary: 'Follow a user',
          security: [{ bearerAuth: [] }],
          params: followAuthorParamsSchema,
        },
      },
      followAuthor,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/users/follow/:followId',
      {
        schema: {
          tags: ['Users'],
          summary: 'Unfollow a user',
          security: [{ bearerAuth: [] }],
          params: unfollowAuthorParamsSchema,
        },
      },
      unfollowAuthor,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/users/followers',
      {
        schema: {
          tags: ['Users'],
          summary: 'Fetch user followers',
          security: [{ bearerAuth: [] }],
          querystring: paginationQuerySchema,
        },
      },
      fetchAuthorFollowers,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/users/followings',
      {
        schema: {
          tags: ['Users'],
          summary: 'Fetch user followings',
          security: [{ bearerAuth: [] }],
          querystring: paginationQuerySchema,
        },
      },
      fetchAuthorFollowings,
    )
}

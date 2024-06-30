import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { auth } from '../../middlewares/auth'
import { comment } from './comment'
import { create } from './create'
import { deletePost } from './delete'
import { edit } from './edit'
import { fetchPostComments } from './fetch-post-comments'
import {
  commentOnPostBodySchema,
  commentOnPostParamsSchema,
  createPostBodySchema,
  deletePostBodySchema,
  editPostBodySchema,
  fetchPostCommentsParamsSchema,
} from './schemas'

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
          summary: 'Edit a post',
          security: [{ bearerAuth: [] }],
          body: editPostBodySchema,
        },
      },
      edit,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/posts/delete',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Delete a post',
          security: [{ bearerAuth: [] }],
          body: deletePostBodySchema,
        },
      },
      deletePost,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/posts/:postId/comments',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Comment in a post',
          security: [{ bearerAuth: [] }],
          body: commentOnPostBodySchema,
          params: commentOnPostParamsSchema,
        },
      },
      comment,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/posts/:postId/comments',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Fetch post comments',
          security: [{ bearerAuth: [] }],
          params: fetchPostCommentsParamsSchema,
        },
      },
      fetchPostComments,
    )
}

import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { auth } from '../../middlewares/auth'
import { paginationQuerySchema } from '../schemas'
import { comment } from './comment'
import { create } from './create'
import { deletePost } from './delete'
import { edit } from './edit'
import { editComment } from './edit-post-comment'
import { fetchPostComments } from './fetch-post-comments'
import { fetchPostLikes } from './fetch-post-likes'
import { fetchPostTags } from './fetch-post-tags'
import { fetchPosts } from './fetch-posts'
import { fetchSavedPosts } from './fetch-saved-posts'
import { like } from './like'
import { likeComment } from './like-comment'
import { removeCommentLike } from './remove-comment-like'
import { removePostLike } from './remove-post-like'
import { removeSavedPost } from './remove-saved-post'
import { replyToComment } from './reply-to-comment'
import { save } from './save-post'
import {
  commentOnPostBodySchema,
  commentOnPostParamsSchema,
  createPostBodySchema,
  deletePostBodySchema,
  editPostBodySchema,
  editPostCommentBodySchema,
  editPostCommentParamsSchema,
  editPostParamsSchema,
  fetchPostCommentsParamsSchema,
  fetchPostLikesParamsSchema,
  fetchPostTagsParamsSchema,
  likeCommentParamsSchema,
  likePostParamsSchema,
  removeCommentLikeParamsSchema,
  removePostLikeParamsSchema,
  removeSavedPostParamsSchema,
  replyToCommentBodySchema,
  replyToCommentParamsSchema,
  savePostParamsSchema,
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
    .put(
      '/posts/:postId/edit',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Edit a post',
          security: [{ bearerAuth: [] }],
          body: editPostBodySchema,
          params: editPostParamsSchema,
        },
      },
      edit,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
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
    .put(
      '/posts/comments/:commentId',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Edit a post comment',
          security: [{ bearerAuth: [] }],
          body: editPostCommentBodySchema,
          params: editPostCommentParamsSchema,
        },
      },
      editComment,
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
          querystring: paginationQuerySchema,
        },
      },
      fetchPostComments,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/posts/:postId/comments/:replyToId',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Reply a post comment',
          security: [{ bearerAuth: [] }],
          body: replyToCommentBodySchema,
          params: replyToCommentParamsSchema,
        },
      },
      replyToComment,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/posts/:postId/likes',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Like a post',
          security: [{ bearerAuth: [] }],
          params: likePostParamsSchema,
        },
      },
      like,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/posts/:postId/likes',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Remove a post like',
          security: [{ bearerAuth: [] }],
          params: removePostLikeParamsSchema,
        },
      },
      removePostLike,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/posts/comments/:commentId/likes',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Like a comment',
          security: [{ bearerAuth: [] }],
          params: likeCommentParamsSchema,
        },
      },
      likeComment,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/posts/comments/:commentId/likes/:likeId',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Remove a comment like',
          security: [{ bearerAuth: [] }],
          params: removeCommentLikeParamsSchema,
        },
      },
      removeCommentLike,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/posts/:postId/tags',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Fetch post tags',
          security: [{ bearerAuth: [] }],
          params: fetchPostTagsParamsSchema,
          querystring: paginationQuerySchema,
        },
      },
      fetchPostTags,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/posts',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Fetch posts',
          security: [{ bearerAuth: [] }],
          querystring: paginationQuerySchema,
        },
      },
      fetchPosts,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/posts/:postId/save',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Save a post',
          security: [{ bearerAuth: [] }],
          params: savePostParamsSchema,
        },
      },
      save,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/posts/save/:savedPostId',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Remove a saved post',
          security: [{ bearerAuth: [] }],
          params: removeSavedPostParamsSchema,
        },
      },
      removeSavedPost,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/posts/save',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Fetch saved posts',
          security: [{ bearerAuth: [] }],
        },
      },
      fetchSavedPosts,
    )

  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/posts/:postId/likes',
      {
        schema: {
          tags: ['Posts'],
          summary: 'Fetch post likes',
          security: [{ bearerAuth: [] }],
          params: fetchPostLikesParamsSchema,
          querystring: paginationQuerySchema,
        },
      },
      fetchPostLikes,
    )
}

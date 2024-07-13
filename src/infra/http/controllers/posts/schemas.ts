import { z } from 'zod'

export const paginationQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
})

export const createPostBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  collabId: z.string().uuid().optional(),
  status: z.enum(['PUBLISHED', 'DRAFT']).default('DRAFT'),
})

export const editPostBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  status: z.enum(['PUBLISHED', 'DRAFT']),
})

export const editPostParamsSchema = z.object({
  postId: z.string().uuid(),
})

export const deletePostBodySchema = z.object({
  postId: z.string().uuid(),
})

export const commentOnPostBodySchema = z.object({
  content: z.string(),
})

export const commentOnPostParamsSchema = z.object({
  postId: z.string().uuid(),
})

export const fetchPostCommentsParamsSchema = z.object({
  postId: z.string().uuid(),
})

export const replyToCommentBodySchema = z.object({
  content: z.string(),
})

export const replyToCommentParamsSchema = z.object({
  postId: z.string().uuid(),
  replyToId: z.string().uuid(),
})

export const likePostParamsSchema = z.object({
  postId: z.string().uuid(),
})

export const removePostLikeParamsSchema = z.object({
  postId: z.string().uuid(),
  likeId: z.string().uuid(),
})

export const likeCommentParamsSchema = z.object({
  commentId: z.string().uuid(),
})

export const removeCommentLikeParamsSchema = z.object({
  commentId: z.string().uuid(),
  likeId: z.string().uuid(),
})

export const fetchPostTagsParamsSchema = z.object({
  postId: z.string().uuid(),
})

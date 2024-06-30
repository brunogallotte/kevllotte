import { z } from 'zod'

export const createPostBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  collabId: z.string().uuid().optional(),
  status: z.enum(['PUBLISHED', 'DRAFT']).default('DRAFT'),
})

export const editPostBodySchema = z.object({
  postId: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  status: z.enum(['PUBLISHED', 'DRAFT']),
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

export const fetchPostCommentsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
})

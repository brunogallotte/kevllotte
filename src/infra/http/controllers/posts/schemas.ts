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

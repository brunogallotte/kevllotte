import { z } from 'zod'

export const createPostBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  userId: z.string().uuid(),
  collabId: z.string().uuid().optional(),
  status: z.enum(['PUBLISHED', 'DRAFT']).default('DRAFT'),
})

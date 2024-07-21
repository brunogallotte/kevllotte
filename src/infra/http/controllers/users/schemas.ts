import { z } from 'zod'

export const registerAuthorBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  username: z
    .string()
    .min(4, { message: 'Username must have at least 4 characters' })
    .regex(/^[a-z0-9_-]+$/),
  password: z.string().min(8),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  websiteUrl: z.string().optional(),
})

export const authenticateAuthorBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const editAuthorProfileBodySchema = z.object({
  name: z.string().optional(),
  username: z
    .string()
    .min(4, { message: 'Username must have at least 4 characters' })
    .regex(/^[a-z0-9_-]+$/),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  websiteUrl: z.string().optional(),
})

export const fetchAuthorPostsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
})

export const createReportBodySchema = z.object({
  reportedAuthorId: z.string().uuid(),
  reason: z.string(),
  description: z.string(),
})

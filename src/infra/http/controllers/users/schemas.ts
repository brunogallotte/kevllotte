import { z } from 'zod'

export const registerAuthorBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
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
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  websiteUrl: z.string().optional(),
})

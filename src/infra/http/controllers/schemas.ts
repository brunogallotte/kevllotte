import { z } from 'zod'

export const paginationQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
})

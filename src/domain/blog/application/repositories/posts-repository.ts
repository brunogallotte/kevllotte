import type { Post, Prisma } from '@prisma/client'

import type { PaginationParams } from '@/core/repositories/pagination-params'

export type PostsRepository = {
  findById(id: string): Promise<Post | null>
  findManyByUserId(userId: string, params: PaginationParams): Promise<Post[]>
  delete(id: string): Promise<void>
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
  update(data: Post): Promise<Post>
}

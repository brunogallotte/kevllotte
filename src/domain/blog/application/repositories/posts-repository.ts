import type { Post, Prisma } from '@prisma/client'

export type PostsRepository = {
  findById(id: string): Promise<Post | null>
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
  update(data: Post): Promise<Post>
}

import type { PaginationParams } from '@/core/repositories/pagination-params'

import type { Post } from '../../enterprise/entities/post'

export type PostsRepository = {
  findById(id: string): Promise<Post | null>
  findManyByAuthorId(
    authorId: string,
    params: PaginationParams,
  ): Promise<Post[]>
  findMany(params: PaginationParams): Promise<Post[]>
  delete(post: Post): Promise<void>
  create(post: Post): Promise<void>
  save(post: Post): Promise<void>
}

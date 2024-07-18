import type { PaginationParams } from '@/core/repositories/pagination-params'

import type { Post } from '../../enterprise/entities/post'

export type SavedPostsRepository = {
  findByPostId(postId: string): Promise<Post | null>
  findManyByAuthorId(
    authorId: string,
    params: PaginationParams,
  ): Promise<Post[]>
  delete(post: Post): Promise<void>
  create(post: Post): Promise<void>
}

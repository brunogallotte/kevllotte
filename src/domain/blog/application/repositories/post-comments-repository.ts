import { PaginationParams } from '@/core/repositories/pagination-params'

import type { PostComment } from '../../enterprise/entities/post-comment'

export type PostCommentsRepository = {
  findById(id: string): Promise<PostComment | null>
  findManyByPostId(
    postId: string,
    params: PaginationParams,
  ): Promise<PostComment[]>
  create(postComment: PostComment): Promise<void>
  delete(postComment: PostComment): Promise<void>
}

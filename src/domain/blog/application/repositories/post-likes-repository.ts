import { PaginationParams } from '@/core/repositories/pagination-params'

import type { PostLike } from '../../enterprise/entities/post-like'

export type PostLikesRepository = {
  findById(id: string): Promise<PostLike | null>
  findManyByPostId(
    postId: string,
    params: PaginationParams,
  ): Promise<PostLike[]>
  create(postLike: PostLike): Promise<void>
  delete(postLike: PostLike): Promise<void>
}

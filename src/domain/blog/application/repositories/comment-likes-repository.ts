import { PaginationParams } from '@/core/repositories/pagination-params'

import type { CommentLike } from '../../enterprise/entities/comment-like'

export type CommentLikesRepository = {
  findById(id: string): Promise<CommentLike | null>
  findManyByCommentId(
    commentId: string,
    params: PaginationParams,
  ): Promise<CommentLike[]>
  create(commentLike: CommentLike): Promise<void>
  delete(commentLike: CommentLike): Promise<void>
}

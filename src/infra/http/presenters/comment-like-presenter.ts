import type { CommentLike } from '@/domain/blog/enterprise/entities/comment-like'

export class CommentLikePresenter {
  static toHTTP(commentLike: CommentLike) {
    return {
      id: commentLike.id.toString(),
      authorId: commentLike.authorId.toString(),
      commentId: commentLike.commentId.toString(),
      createdAt: commentLike.createdAt,
    }
  }
}

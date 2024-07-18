import type { PostComment } from '@/domain/blog/enterprise/entities/post-comment'

import { CommentLikePresenter } from './comment-like-presenter'

export class PostCommentPresenter {
  static toHTTP(postComment: PostComment) {
    return {
      id: postComment.id.toString(),
      authorId: postComment.authorId.toString(),
      postId: postComment.postId.toString(),
      content: postComment.content,
      likes: postComment.likes.map((like) => CommentLikePresenter.toHTTP(like)),
      createdAt: postComment.createdAt,
      updatedAt: postComment.updatedAt,
    }
  }
}

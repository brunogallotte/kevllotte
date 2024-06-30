import type { PostComment } from '@/domain/blog/enterprise/entities/post-comment'

export class PostCommentPresenter {
  static toHTTP(postComment: PostComment) {
    return {
      id: postComment.id.toString(),
      authorId: postComment.authorId.toString(),
      postId: postComment.postId.toString(),
      content: postComment.content,
      createdAt: postComment.createdAt,
      updatedAt: postComment.updatedAt,
    }
  }
}

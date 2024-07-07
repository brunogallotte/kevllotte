import type { PostLike } from '@/domain/blog/enterprise/entities/post-like'

export class PostLikePresenter {
  static toHTTP(postLike: PostLike) {
    return {
      id: postLike.id.toString(),
      authorId: postLike.authorId.toString(),
      postId: postLike.postId.toString(),
      createdAt: postLike.createdAt,
    }
  }
}

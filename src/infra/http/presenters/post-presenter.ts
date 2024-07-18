import type { Post } from '@/domain/blog/enterprise/entities/post'

import { PostLikePresenter } from './post-like-presenter'

export class PostPresenter {
  static toHTTP(post: Post) {
    return {
      id: post.id.toString(),
      title: post.title,
      content: post.content,
      userId: post.authorId.toString(),
      collabId: post.collabId ? post.collabId.toString() : undefined,
      status: post.status,
      slug: post.slug,
      likes: post.likes.map((like) => PostLikePresenter.toHTTP(like)),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  }
}

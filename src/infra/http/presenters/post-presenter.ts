import type { Post } from '@/domain/blog/enterprise/entities/post'

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
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  }
}

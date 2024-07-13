import type { Tag } from '@/domain/blog/enterprise/entities/tag'

export class PostTagPresenter {
  static toHTTP(postTag: Tag) {
    return {
      id: postTag.id.toString(),
      postId: postTag.postId.toString(),
      name: postTag.name,
      createdAt: postTag.createdAt,
    }
  }
}

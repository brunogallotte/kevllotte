import { DomainEvents } from '@/core/events/domain-events'
import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { PostLikesRepository } from '@/domain/blog/application/repositories/post-likes-repository'
import type { PostLike } from '@/domain/blog/enterprise/entities/post-like'

export class InMemoryPostLikesRepository implements PostLikesRepository {
  public items: PostLike[] = []

  async findByPostAndAuthorId(postId: string, authorId: string) {
    const postLike = this.items.find(
      (item) =>
        item.postId.toString() === postId &&
        item.authorId.toString() === authorId,
    )

    if (!postLike) {
      return null
    }

    return postLike
  }

  async findManyByPostId(postId: string, { page }: PaginationParams) {
    const postlikes = this.items
      .filter((item) => item.postId.toString() === postId)
      .slice((page - 1) * 20, page * 20)

    return postlikes
  }

  async create(postLike: PostLike) {
    this.items.push(postLike)

    DomainEvents.dispatchEventsForAggregate(postLike.id)
  }

  async delete(postLike: PostLike) {
    const itemIndex = this.items.findIndex((item) => item.id === postLike.id)

    this.items.splice(itemIndex, 1)
  }
}

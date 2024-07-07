import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import type { CommentLikesRepository } from '@/domain/blog/application/repositories/comment-likes-repository'
import type { CommentLike } from '@/domain/blog/enterprise/entities/comment-like'

export class InMemoryCommentLikesRepository implements CommentLikesRepository {
  public items: CommentLike[] = []

  async findById(id: string) {
    const commentLike = this.items.find((item) => item.id.toString() === id)

    if (!commentLike) {
      return null
    }

    return commentLike
  }

  async findManyByCommentId(commentId: string, { page }: PaginationParams) {
    const commentLikes = this.items
      .filter((item) => item.commentId.toString() === commentId)
      .slice((page - 1) * 20, page * 20)

    return commentLikes
  }

  async create(commentLike: CommentLike) {
    this.items.push(commentLike)

    DomainEvents.dispatchEventsForAggregate(commentLike.id)
  }

  async delete(commentLike: CommentLike) {
    const itemIndex = this.items.findIndex((item) => item.id === commentLike.id)

    this.items.splice(itemIndex, 1)
  }
}

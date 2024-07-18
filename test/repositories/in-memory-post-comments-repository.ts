import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import type { PostCommentsRepository } from '@/domain/blog/application/repositories/post-comments-repository'
import type { PostComment } from '@/domain/blog/enterprise/entities/post-comment'

export class InMemoryPostCommentsRepository implements PostCommentsRepository {
  public items: PostComment[] = []

  async findById(id: string) {
    const postComment = this.items.find((item) => item.id.toString() === id)

    if (!postComment) {
      return null
    }

    return postComment
  }

  async create(postComment: PostComment) {
    this.items.push(postComment)

    DomainEvents.dispatchEventsForAggregate(postComment.id)
  }

  async findManyByPostId(postId: string, { page }: PaginationParams) {
    const postComments = this.items
      .filter((item) => item.postId.toString() === postId)
      .slice((page - 1) * 20, page * 20)

    return postComments
  }

  async save(postComment: PostComment) {
    const itemIndex = this.items.findIndex((item) => item.id === postComment.id)

    this.items[itemIndex] = postComment
  }

  async delete(postComment: PostComment) {
    const itemIndex = this.items.findIndex((item) => item.id === postComment.id)

    this.items.splice(itemIndex, 1)
  }
}

import { DomainEvents } from '@/core/events/domain-events'
import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { PostsRepository } from '@/domain/blog/application/repositories/posts-repository'
import { type Post, POST_STATUS } from '@/domain/blog/enterprise/entities/post'

export class InMemoryPostsRepository implements PostsRepository {
  public items: Post[] = []

  async findById(id: string) {
    const post = this.items.find((post) => post.id.toString() === id)

    if (!post) {
      return null
    }

    return post
  }

  async findManyByAuthorId(authorId: string, { page }: PaginationParams) {
    const posts = this.items
      .filter((item) => item.authorId.toString() === authorId)
      .slice((page - 1) * 20, page * 20)

    return posts
  }

  async findMany({ page }: PaginationParams) {
    const posts = this.items
      .filter((item) => item.status !== POST_STATUS.DRAFT)
      .slice((page - 1) * 20, page * 20)

    return posts
  }

  async delete(post: Post) {
    const itemIndex = this.items.findIndex((item) => item.id === post.id)

    this.items.splice(itemIndex, 1)
  }

  async save(post: Post) {
    const itemIndex = this.items.findIndex((item) => item.id === post.id)

    this.items[itemIndex] = post

    DomainEvents.dispatchEventsForAggregate(post.id)
  }

  async create(post: Post) {
    this.items.push(post)

    DomainEvents.dispatchEventsForAggregate(post.id)
  }
}

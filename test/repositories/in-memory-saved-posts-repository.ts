import { DomainEvents } from '@/core/events/domain-events'
import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { SavedPostsRepository } from '@/domain/blog/application/repositories/saved-posts-repository'
import type { Post } from '@/domain/blog/enterprise/entities/post'

export class InMemorySavedPostsRepository implements SavedPostsRepository {
  public items: Post[] = []

  async findByPostId(postId: string) {
    const savedPost = this.items.find((item) => item.id.toString() === postId)

    if (!savedPost) {
      return null
    }

    return savedPost
  }

  async findManyByAuthorId(authorId: string, { page }: PaginationParams) {
    const savedPosts = this.items
      .filter((item) => item.authorId.toString() === authorId)
      .slice((page - 1) * 20, page * 20)

    return savedPosts
  }

  async findMany({ page }: PaginationParams) {
    const savedPosts = this.items.slice((page - 1) * 20, page * 20)

    return savedPosts
  }

  async delete(savedPost: Post) {
    const itemIndex = this.items.findIndex((item) => item.id === savedPost.id)

    this.items.splice(itemIndex, 1)
  }

  async create(savedPost: Post) {
    this.items.push(savedPost)

    DomainEvents.dispatchEventsForAggregate(savedPost.id)
  }
}

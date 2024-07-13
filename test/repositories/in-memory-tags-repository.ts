import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { TagsRepository } from '@/domain/blog/application/repositories/tags-repository'
import type { Tag } from '@/domain/blog/enterprise/entities/tag'

export class InMemoryTagsRepository implements TagsRepository {
  public items: Tag[] = []

  async findById(id: string) {
    const tag = this.items.find((tag) => tag.id.toString() === id)

    if (!tag) {
      return null
    }

    return tag
  }

  async findManyByPostId(postId: string, { page }: PaginationParams) {
    const tags = this.items
      .filter((item) => item.postId.toString() === postId)
      .slice((page - 1) * 20, page * 20)

    return tags
  }

  async delete(tag: Tag) {
    const itemIndex = this.items.findIndex((item) => item.id === tag.id)

    this.items.splice(itemIndex, 1)
  }

  async create(tag: Tag) {
    this.items.push(tag)
  }
}

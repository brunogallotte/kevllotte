import { DomainEvents } from '@/core/events/domain-events'
import type { AuthorsRepository } from '@/domain/blog/application/repositories/authors-repository'
import type { Author } from '@/domain/blog/enterprise/entities/author'

export class InMemoryAuthorsRepository implements AuthorsRepository {
  public items: Author[] = []

  async findById(id: string) {
    const author = this.items.find((author) => author.id.toString() === id)

    if (!author) {
      return null
    }

    return author
  }

  async findByEmail(email: string) {
    const author = this.items.find((author) => author.email === email)

    if (!author) {
      return null
    }

    return author
  }

  async create(author: Author) {
    this.items.push(author)

    DomainEvents.dispatchEventsForAggregate(author.id)
  }

  async delete(author: Author) {
    const itemIndex = this.items.findIndex((item) => item.id === author.id)

    this.items.splice(itemIndex, 1)
  }
}

import type { Author } from '../../enterprise/entities/author'

export type AuthorsRepository = {
  findById(id: string): Promise<Author | null>
  findByEmail(email: string): Promise<Author | null>
  create(author: Author): Promise<void>
  delete(author: Author): Promise<void>
}

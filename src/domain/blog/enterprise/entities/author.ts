import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

type AuthorProps = {
  name: string
}

export class Author extends Entity<AuthorProps> {
  static create(props: AuthorProps, id?: UniqueEntityID) {
    const author = new Author(props, id)

    return author
  }
}

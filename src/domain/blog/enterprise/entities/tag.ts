import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

export type TagProps = {
  name: string
  postId: UniqueEntityID
  createdAt: Date
}

export class Tag extends Entity<TagProps> {
  get name() {
    return this.props.name
  }

  get postId() {
    return this.props.postId
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<TagProps, 'createdAt'>, id?: UniqueEntityID) {
    const tag = new Tag(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return tag
  }
}

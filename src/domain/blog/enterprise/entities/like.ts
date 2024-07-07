import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export type LikeProps = {
  authorId: UniqueEntityID
  createdAt: Date
}

export abstract class Like<
  Props extends LikeProps,
> extends AggregateRoot<Props> {
  get authorId() {
    return this.props.authorId
  }

  get createdAt() {
    return this.props.createdAt
  }
}

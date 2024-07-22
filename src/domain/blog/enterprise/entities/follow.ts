import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

export type FollowProps = {
  followerAuthorId: UniqueEntityID
  followingAuthorId: UniqueEntityID
  createdAt: Date
}

export class Follow extends Entity<FollowProps> {
  get followerAuthorId() {
    return this.props.followerAuthorId
  }

  get followingAuthorId() {
    return this.props.followingAuthorId
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<FollowProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const follow = new Follow(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return follow
  }
}

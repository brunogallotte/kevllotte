import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Like, type LikeProps } from './like'

export type PostLikeProps = LikeProps & {
  postId: UniqueEntityID
}

export class PostLike extends Like<PostLikeProps> {
  get postId() {
    return this.props.postId
  }

  static create(
    props: Optional<PostLikeProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const postLike = new PostLike(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return postLike
  }
}

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Like, type LikeProps } from './like'

export type CommentLikeProps = LikeProps & {
  commentId: UniqueEntityID
}

export class CommentLike extends Like<CommentLikeProps> {
  get commentId() {
    return this.props.commentId
  }

  static create(
    props: Optional<CommentLikeProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const commentLike = new CommentLike(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return commentLike
  }
}

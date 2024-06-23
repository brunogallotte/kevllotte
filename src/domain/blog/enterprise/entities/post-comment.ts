import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { PostCommentCreatedEvent } from '../events/post-comment-created-event'
import { Comment, CommentProps } from './comment'

export type PostCommentProps = CommentProps & {
  postId: UniqueEntityID
}

export class PostComment extends Comment<PostCommentProps> {
  get postId() {
    return this.props.postId
  }

  static create(
    props: Optional<PostCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const postComment = new PostComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    const isNewPostComment = !id

    if (isNewPostComment) {
      postComment.addDomainEvent(new PostCommentCreatedEvent(postComment))
    }

    return postComment
  }
}

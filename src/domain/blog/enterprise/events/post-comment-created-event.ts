import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'

import { PostComment } from '../entities/post-comment'

export class PostCommentCreatedEvent implements DomainEvent {
  public occurredAt: Date

  public postComment: PostComment

  constructor(postComment: PostComment) {
    this.postComment = postComment

    this.occurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.postComment.id
  }
}

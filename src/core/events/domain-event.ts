import { UniqueEntityID } from '../entities/unique-entity-id'

export type DomainEvent = {
  occurredAt: Date
  getAggregateId(): UniqueEntityID
}

import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export type ReportProps = {
  reportedById: UniqueEntityID
  reason: string
  description?: string
  createdAt: Date
}

export abstract class Report<
  Props extends ReportProps,
> extends AggregateRoot<Props> {
  get reportedById() {
    return this.props.reportedById
  }

  get reason() {
    return this.props.reason
  }

  get description() {
    return this.props.description
  }

  get createdAt() {
    return this.props.createdAt
  }
}

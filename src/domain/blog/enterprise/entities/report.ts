import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

export type ReportProps = {
  reportedById: UniqueEntityID
  reportedAuthorId: UniqueEntityID
  reason: string
  description: string
  createdAt: Date
}

export class Report extends Entity<ReportProps> {
  get reportedById() {
    return this.props.reportedById
  }

  get reportedAuthorId() {
    return this.props.reportedAuthorId
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

  static create(
    props: Optional<ReportProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const report = new Report(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return report
  }
}

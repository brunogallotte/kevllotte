import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Report, type ReportProps } from './report'

export type AuthorReportProps = ReportProps & {
  reportedAuthorId: UniqueEntityID
}

export class AuthorReport extends Report<AuthorReportProps> {
  get reportedAuthorId() {
    return this.props.reportedAuthorId
  }

  static create(
    props: Optional<AuthorReportProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const authorReport = new AuthorReport(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return authorReport
  }
}

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Report, type ReportProps } from './report'

export type PostReportProps = ReportProps & {
  reportedPostId: UniqueEntityID
}

export class PostReport extends Report<PostReportProps> {
  get reportedPostId() {
    return this.props.reportedPostId
  }

  static create(
    props: Optional<PostReportProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const postReport = new PostReport(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return postReport
  }
}

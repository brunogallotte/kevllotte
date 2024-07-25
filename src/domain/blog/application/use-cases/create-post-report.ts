import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { PostReport } from '../../enterprise/entities/post-report'
import type { PostReportsRepository } from '../repositories/post-reports-repository'

export type CreatePostReportUseCaseRequest = {
  reportedById: string
  reportedPostId: string
  reason: string
  description: string
}

type CreatePostReportUseCaseResponse = Either<
  null,
  {
    postReport: PostReport
  }
>

export class CreatePostReportUseCase {
  constructor(private postReportsRepository: PostReportsRepository) {}

  async execute({
    reportedById,
    reportedPostId,
    reason,
    description,
  }: CreatePostReportUseCaseRequest): Promise<CreatePostReportUseCaseResponse> {
    const postReport = PostReport.create({
      reportedById: new UniqueEntityID(reportedById),
      reportedPostId: new UniqueEntityID(reportedPostId),
      reason,
      description,
    })

    await this.postReportsRepository.create(postReport)

    return right({ postReport })
  }
}

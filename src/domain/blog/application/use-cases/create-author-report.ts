import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { AuthorReport } from '../../enterprise/entities/author-report'
import type { AuthorReportsRepository } from '../repositories/author-reports-repository'

export type CreateAuthorReportUseCaseRequest = {
  reportedById: string
  reportedAuthorId: string
  reason: string
  description?: string
}

type CreateAuthorReportUseCaseResponse = Either<
  null,
  {
    authorReport: AuthorReport
  }
>

export class CreateAuthorReportUseCase {
  constructor(private authorReportsRepository: AuthorReportsRepository) {}

  async execute({
    reportedById,
    reportedAuthorId,
    reason,
    description,
  }: CreateAuthorReportUseCaseRequest): Promise<CreateAuthorReportUseCaseResponse> {
    const authorReport = AuthorReport.create({
      reportedById: new UniqueEntityID(reportedById),
      reportedAuthorId: new UniqueEntityID(reportedAuthorId),
      reason,
      description,
    })

    await this.authorReportsRepository.create(authorReport)

    return right({ authorReport })
  }
}

import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Report } from '../../enterprise/entities/report'
import type { ReportsRepository } from '../repositories/reports-repository'

export type CreateReportUseCaseRequest = {
  reportedById: string
  reportedAuthorId: string
  reason: string
  description: string
}

type CreateReportUseCaseResponse = Either<
  null,
  {
    report: Report
  }
>

export class CreateReportUseCase {
  constructor(private reportsRepository: ReportsRepository) {}

  async execute({
    reportedById,
    reportedAuthorId,
    reason,
    description,
  }: CreateReportUseCaseRequest): Promise<CreateReportUseCaseResponse> {
    const report = Report.create({
      reportedById: new UniqueEntityID(reportedById),
      reportedAuthorId: new UniqueEntityID(reportedAuthorId),
      reason,
      description,
    })

    await this.reportsRepository.create(report)

    return right({ report })
  }
}

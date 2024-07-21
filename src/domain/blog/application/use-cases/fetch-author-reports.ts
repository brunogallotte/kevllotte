import { Either, right } from '@/core/either'

import type { Report } from '../../enterprise/entities/report'
import type { ReportsRepository } from '../repositories/reports-repository'

type FetchAuthorReportsUseCaseRequest = {
  authorId: string
  page: number
}

type FetchAuthorReportsUseCaseResponse = Either<
  null,
  {
    reports: Report[]
  }
>

export class FetchAuthorReportsUseCase {
  constructor(private reportsRepository: ReportsRepository) {}

  async execute({
    authorId,
    page,
  }: FetchAuthorReportsUseCaseRequest): Promise<FetchAuthorReportsUseCaseResponse> {
    const reports = await this.reportsRepository.findManyByAuthorId(authorId, {
      page,
    })

    return right({ reports })
  }
}

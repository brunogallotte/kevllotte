import { CreateAuthorReportUseCase } from '@/domain/blog/application/use-cases/create-author-report'

import { PrismaAuthorReportsRepository } from '../repositories/prisma-author-reports-repository'

export function makeCreateAuthorReportUseCase() {
  const authorReportsRepository = new PrismaAuthorReportsRepository()

  const createAuthorReportUseCase = new CreateAuthorReportUseCase(
    authorReportsRepository,
  )

  return createAuthorReportUseCase
}

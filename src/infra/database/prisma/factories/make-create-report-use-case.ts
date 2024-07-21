import { CreateReportUseCase } from '../../../../domain/blog/application/use-cases/create-report'
import { PrismaReportsRepository } from '../repositories/prisma-reports-repository'

export function makeCreateReportUseCase() {
  const reportsRepository = new PrismaReportsRepository()

  const createReportUseCase = new CreateReportUseCase(reportsRepository)

  return createReportUseCase
}

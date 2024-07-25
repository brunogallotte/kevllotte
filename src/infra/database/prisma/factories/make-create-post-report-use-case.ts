import { CreatePostReportUseCase } from '@/domain/blog/application/use-cases/create-post-report'

import { PrismaPostReportsRepository } from '../repositories/prisma-post-reports-repository'

export function makeCreatePostReportUseCase() {
  const postReportsRepository = new PrismaPostReportsRepository()

  const createPostReportUseCase = new CreatePostReportUseCase(
    postReportsRepository,
  )

  return createPostReportUseCase
}

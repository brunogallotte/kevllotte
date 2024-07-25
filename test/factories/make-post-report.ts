import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  PostReport,
  type PostReportProps,
} from '@/domain/blog/enterprise/entities/post-report'
import { PrismaPostReportMapper } from '@/infra/database/prisma/mappers/prisma-post-report.mapper'
import { prisma } from '@/lib/prisma'

export function makePostReport(
  override: Partial<PostReportProps> = {},
  id?: UniqueEntityID,
) {
  const postReport = PostReport.create(
    {
      reportedById: new UniqueEntityID(),
      reportedPostId: new UniqueEntityID(),
      reason: faker.lorem.words(10),
      description: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return postReport
}

export class PostReportFactory {
  async makePrismaPostReport(
    data: Partial<PostReportProps> = {},
  ): Promise<PostReport> {
    const postReport = makePostReport(data)

    await prisma.postReport.create({
      data: PrismaPostReportMapper.toPrisma(postReport),
    })

    return postReport
  }
}

import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AuthorReport,
  type AuthorReportProps,
} from '@/domain/blog/enterprise/entities/author-report'
import { PrismaAuthorReportMapper } from '@/infra/database/prisma/mappers/prisma-author-report-mapper'
import { prisma } from '@/lib/prisma'

export function makeAuthorReport(
  override: Partial<AuthorReportProps> = {},
  id?: UniqueEntityID,
) {
  const authorReport = AuthorReport.create(
    {
      reportedById: new UniqueEntityID(),
      reportedAuthorId: new UniqueEntityID(),
      reason: faker.lorem.words(10),
      description: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return authorReport
}

export class AuthorReportFactory {
  async makePrismaAuthorReport(
    data: Partial<AuthorReportProps> = {},
  ): Promise<AuthorReport> {
    const authorReport = makeAuthorReport(data)

    await prisma.userReport.create({
      data: PrismaAuthorReportMapper.toPrisma(authorReport),
    })

    return authorReport
  }
}

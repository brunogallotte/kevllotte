import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Report,
  type ReportProps,
} from '@/domain/blog/enterprise/entities/report'
import { PrismaReportMapper } from '@/infra/database/prisma/mappers/prisma-report-mapper'
import { prisma } from '@/lib/prisma'

export function makeReport(
  override: Partial<ReportProps> = {},
  id?: UniqueEntityID,
) {
  const report = Report.create(
    {
      reportedById: new UniqueEntityID(),
      reportedAuthorId: new UniqueEntityID(),
      reason: faker.lorem.words(10),
      description: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return report
}

export class ReportFactory {
  async makePrismaReport(data: Partial<ReportProps> = {}): Promise<Report> {
    const report = makeReport(data)

    await prisma.report.create({
      data: PrismaReportMapper.toPrisma(report),
    })

    return report
  }
}

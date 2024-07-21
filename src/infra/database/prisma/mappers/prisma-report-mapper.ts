import { type Prisma, Report as PrismaReport } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Report } from '@/domain/blog/enterprise/entities/report'

export class PrismaReportMapper {
  static toDomain(raw: PrismaReport): Report {
    return Report.create(
      {
        reportedById: new UniqueEntityID(raw.reportedById),
        reportedAuthorId: new UniqueEntityID(raw.reportedUserId),
        reason: raw.description,
        description: raw.description,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(report: Report): Prisma.ReportUncheckedCreateInput {
    return {
      id: report.id.toString(),
      reportedById: report.reportedById.toString(),
      reportedUserId: report.reportedAuthorId.toString(),
      reason: report.reason,
      description: report.description,
      createdAt: report.createdAt,
    }
  }
}

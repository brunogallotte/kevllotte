import { type Prisma, UserReport as PrismaAuthorReport } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AuthorReport } from '@/domain/blog/enterprise/entities/author-report'

export class PrismaAuthorReportMapper {
  static toDomain(raw: PrismaAuthorReport): AuthorReport {
    return AuthorReport.create(
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

  static toPrisma(report: AuthorReport): Prisma.UserReportUncheckedCreateInput {
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

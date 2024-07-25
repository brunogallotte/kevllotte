import { PostReport as PrismaPostReport, type Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PostReport } from '@/domain/blog/enterprise/entities/post-report'

export class PrismaPostReportMapper {
  static toDomain(raw: PrismaPostReport): PostReport {
    return PostReport.create(
      {
        reportedById: new UniqueEntityID(raw.reportedById),
        reportedPostId: new UniqueEntityID(raw.reportedPostId),
        reason: raw.description,
        description: raw.description,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(report: PostReport): Prisma.PostReportUncheckedCreateInput {
    return {
      id: report.id.toString(),
      reportedById: report.reportedById.toString(),
      reportedPostId: report.reportedPostId.toString(),
      reason: report.reason,
      description: report.description,
      createdAt: report.createdAt,
    }
  }
}

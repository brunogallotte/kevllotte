import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { ReportsRepository } from '@/domain/blog/application/repositories/reports-repository'
import { Report } from '@/domain/blog/enterprise/entities/report'
import { prisma } from '@/lib/prisma'

import { PrismaReportMapper } from '../mappers/prisma-report-mapper'

export class PrismaReportsRepository implements ReportsRepository {
  async findById(id: string) {
    const report = await prisma.report.findUnique({
      where: {
        id,
      },
    })

    if (!report) {
      return null
    }

    return PrismaReportMapper.toDomain(report)
  }

  async findManyByAuthorId(authorId: string, { page }: PaginationParams) {
    const reports = await prisma.report.findMany({
      where: {
        reportedById: authorId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return reports.map((report) => PrismaReportMapper.toDomain(report))
  }

  async delete(report: Report) {
    await prisma.report.delete({
      where: {
        id: report.id.toString(),
      },
    })
  }

  async create(report: Report) {
    const data = PrismaReportMapper.toPrisma(report)

    await prisma.report.create({
      data,
    })
  }
}

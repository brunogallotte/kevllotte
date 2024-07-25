import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { AuthorReportsRepository } from '@/domain/blog/application/repositories/author-reports-repository'
import type { AuthorReport } from '@/domain/blog/enterprise/entities/author-report'
import { prisma } from '@/lib/prisma'

import { PrismaAuthorReportMapper } from '../mappers/prisma-author-report-mapper'

export class PrismaAuthorReportsRepository implements AuthorReportsRepository {
  async findById(id: string) {
    const report = await prisma.userReport.findUnique({
      where: {
        id,
      },
    })

    if (!report) {
      return null
    }

    return PrismaAuthorReportMapper.toDomain(report)
  }

  async findManyByAuthorId(authorId: string, { page }: PaginationParams) {
    const reports = await prisma.userReport.findMany({
      where: {
        reportedById: authorId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return reports.map((report) => PrismaAuthorReportMapper.toDomain(report))
  }

  async delete(report: AuthorReport) {
    await prisma.userReport.delete({
      where: {
        id: report.id.toString(),
      },
    })
  }

  async create(report: AuthorReport) {
    const data = PrismaAuthorReportMapper.toPrisma(report)

    await prisma.userReport.create({
      data,
    })
  }
}

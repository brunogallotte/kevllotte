import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { PostReportsRepository } from '@/domain/blog/application/repositories/post-reports-repository'
import type { PostReport } from '@/domain/blog/enterprise/entities/post-report'
import { prisma } from '@/lib/prisma'

import { PrismaPostReportMapper } from '../mappers/prisma-post-report.mapper'

export class PrismaPostReportsRepository implements PostReportsRepository {
  async findById(id: string) {
    const report = await prisma.postReport.findUnique({
      where: {
        id,
      },
    })

    if (!report) {
      return null
    }

    return PrismaPostReportMapper.toDomain(report)
  }

  async findManyByPostId(postId: string, { page }: PaginationParams) {
    const reports = await prisma.postReport.findMany({
      where: {
        reportedById: postId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return reports.map((report) => PrismaPostReportMapper.toDomain(report))
  }

  async delete(report: PostReport) {
    await prisma.postReport.delete({
      where: {
        id: report.id.toString(),
      },
    })
  }

  async create(report: PostReport) {
    const data = PrismaPostReportMapper.toPrisma(report)

    await prisma.postReport.create({
      data,
    })
  }
}

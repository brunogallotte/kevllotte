import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { ReportsRepository } from '@/domain/blog/application/repositories/reports-repository'
import type { Report } from '@/domain/blog/enterprise/entities/report'

export class InMemoryReportsRepository implements ReportsRepository {
  public items: Report[] = []

  async findById(id: string) {
    const report = this.items.find((report) => report.id.toString() === id)

    if (!report) {
      return null
    }

    return report
  }

  async findManyByAuthorId(authorId: string, { page }: PaginationParams) {
    const reports = this.items
      .filter((item) => item.reportedById.toString() === authorId)
      .slice((page - 1) * 20, page * 20)

    return reports
  }

  async delete(report: Report) {
    const itemIndex = this.items.findIndex((item) => item.id === report.id)

    this.items.splice(itemIndex, 1)
  }

  async create(report: Report) {
    this.items.push(report)
  }
}

import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { AuthorReportsRepository } from '@/domain/blog/application/repositories/author-reports-repository'
import type { AuthorReport } from '@/domain/blog/enterprise/entities/author-report'

export class InMemoryAuthorReportsRepository
  implements AuthorReportsRepository
{
  public items: AuthorReport[] = []

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

  async delete(report: AuthorReport) {
    const itemIndex = this.items.findIndex((item) => item.id === report.id)

    this.items.splice(itemIndex, 1)
  }

  async create(report: AuthorReport) {
    this.items.push(report)
  }
}

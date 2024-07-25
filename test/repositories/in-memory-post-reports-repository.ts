import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { PostReportsRepository } from '@/domain/blog/application/repositories/post-reports-repository'
import type { PostReport } from '@/domain/blog/enterprise/entities/post-report'

export class InMemoryPostReportsRepository implements PostReportsRepository {
  public items: PostReport[] = []

  async findById(id: string) {
    const report = this.items.find((report) => report.id.toString() === id)

    if (!report) {
      return null
    }

    return report
  }

  async findManyByPostId(postId: string, { page }: PaginationParams) {
    const reports = this.items
      .filter((item) => item.reportedById.toString() === postId)
      .slice((page - 1) * 20, page * 20)

    return reports
  }

  async delete(report: PostReport) {
    const itemIndex = this.items.findIndex((item) => item.id === report.id)

    this.items.splice(itemIndex, 1)
  }

  async create(report: PostReport) {
    this.items.push(report)
  }
}

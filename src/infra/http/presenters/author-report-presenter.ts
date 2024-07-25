import type { AuthorReport } from '@/domain/blog/enterprise/entities/author-report'

export class AuthorReportPresenter {
  static toHTTP(report: AuthorReport) {
    return {
      id: report.id.toString(),
      reportedById: report.reportedById.toString(),
      reportedAuthorId: report.reportedAuthorId.toString(),
      reason: report.reason,
      description: report.description,
      createdAt: report.createdAt,
    }
  }
}

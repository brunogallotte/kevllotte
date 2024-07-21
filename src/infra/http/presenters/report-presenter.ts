import type { Report } from '@/domain/blog/enterprise/entities/report'

export class ReportPresenter {
  static toHTTP(report: Report) {
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

import type { PostReport } from '@/domain/blog/enterprise/entities/post-report'

export class PostReportPresenter {
  static toHTTP(report: PostReport) {
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

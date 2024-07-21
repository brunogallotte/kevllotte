import type { PaginationParams } from '@/core/repositories/pagination-params'

import type { Report } from '../../enterprise/entities/report'

export type ReportsRepository = {
  findById(id: string): Promise<Report | null>
  findManyByAuthorId(
    authorId: string,
    params: PaginationParams,
  ): Promise<Report[]>
  delete(report: Report): Promise<void>
  create(report: Report): Promise<void>
}

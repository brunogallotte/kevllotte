import type { PaginationParams } from '@/core/repositories/pagination-params'

import type { AuthorReport } from '../../enterprise/entities/author-report'

export type AuthorReportsRepository = {
  findById(id: string): Promise<AuthorReport | null>
  findManyByAuthorId(
    authorId: string,
    params: PaginationParams,
  ): Promise<AuthorReport[]>
  delete(report: AuthorReport): Promise<void>
  create(report: AuthorReport): Promise<void>
}

import type { PaginationParams } from '@/core/repositories/pagination-params'

import type { PostReport } from '../../enterprise/entities/post-report'

export type PostReportsRepository = {
  findById(id: string): Promise<PostReport | null>
  findManyByPostId(
    postId: string,
    params: PaginationParams,
  ): Promise<PostReport[]>
  delete(report: PostReport): Promise<void>
  create(report: PostReport): Promise<void>
}

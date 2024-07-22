import type { PaginationParams } from '@/core/repositories/pagination-params'

import type { Follow } from '../../enterprise/entities/follow'

export type FollowsRepository = {
  findById(id: string): Promise<Follow | null>
  findManyFollowersByAuthorId(
    authorId: string,
    params: PaginationParams,
  ): Promise<Follow[]>
  findManyFollowingsByAuthorId(
    authorId: string,
    params: PaginationParams,
  ): Promise<Follow[]>
  create(follow: Follow): Promise<void>
  delete(follow: Follow): Promise<void>
}

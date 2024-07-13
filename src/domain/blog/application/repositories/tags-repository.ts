import type { PaginationParams } from '@/core/repositories/pagination-params'

import type { Tag } from '../../enterprise/entities/tag'

export type TagsRepository = {
  findById(id: string): Promise<Tag | null>
  findManyByPostId(postId: string, params: PaginationParams): Promise<Tag[]>
  delete(tag: Tag): Promise<void>
  create(tag: Tag): Promise<void>
}

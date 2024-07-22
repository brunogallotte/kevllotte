import type { Follow } from '../../enterprise/entities/follow'

export type FollowsRepository = {
  findById(id: string): Promise<Follow | null>
  create(follow: Follow): Promise<void>
  delete(follow: Follow): Promise<void>
}

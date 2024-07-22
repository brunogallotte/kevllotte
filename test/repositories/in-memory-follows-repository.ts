import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { FollowsRepository } from '@/domain/blog/application/repositories/follows-repository'
import type { Follow } from '@/domain/blog/enterprise/entities/follow'

export class InMemoryFollowsRepository implements FollowsRepository {
  public items: Follow[] = []

  async findById(id: string) {
    const follow = this.items.find((follow) => follow.id.toString() === id)

    if (!follow) {
      return null
    }

    return follow
  }

  async findManyFollowersByAuthorId(
    authorId: string,
    { page }: PaginationParams,
  ) {
    const followers = this.items
      .filter((item) => item.followingAuthorId.toString() === authorId)
      .slice((page - 1) * 20, page * 20)

    return followers
  }

  async findManyFollowingsByAuthorId(
    authorId: string,
    { page }: PaginationParams,
  ) {
    const followings = this.items
      .filter((item) => item.followerAuthorId.toString() === authorId)
      .slice((page - 1) * 20, page * 20)

    return followings
  }

  async create(follow: Follow) {
    this.items.push(follow)
  }

  async delete(follow: Follow) {
    const itemIndex = this.items.findIndex((item) => item.id === follow.id)

    this.items.splice(itemIndex, 1)
  }
}

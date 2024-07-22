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

  async create(follow: Follow) {
    this.items.push(follow)
  }

  async delete(follow: Follow) {
    const itemIndex = this.items.findIndex((item) => item.id === follow.id)

    this.items.splice(itemIndex, 1)
  }
}

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Follow,
  type FollowProps,
} from '@/domain/blog/enterprise/entities/follow'
import { PrismaFollowMapper } from '@/infra/database/prisma/mappers/prisma-follow-mapper'
import { prisma } from '@/lib/prisma'

export function makeFollow(
  override: Partial<FollowProps> = {},
  id?: UniqueEntityID,
) {
  const follow = Follow.create(
    {
      followerAuthorId: new UniqueEntityID(),
      followingAuthorId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return follow
}

export class FollowFactory {
  async makePrismaFollow(data: Partial<FollowProps> = {}): Promise<Follow> {
    const follow = makeFollow(data)

    await prisma.follow.create({
      data: PrismaFollowMapper.toPrisma(follow),
    })

    return follow
  }
}

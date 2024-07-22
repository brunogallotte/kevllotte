import type { Follow as PrismaFollow, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Follow } from '@/domain/blog/enterprise/entities/follow'

export class PrismaFollowMapper {
  static toDomain(raw: PrismaFollow): Follow {
    return Follow.create(
      {
        followerAuthorId: new UniqueEntityID(raw.followerUserId),
        followingAuthorId: new UniqueEntityID(raw.followingUserId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(follow: Follow): Prisma.FollowUncheckedCreateInput {
    return {
      id: follow.id.toString(),
      followerUserId: follow.followerAuthorId.toString(),
      followingUserId: follow.followingAuthorId.toString(),
      createdAt: follow.createdAt,
    }
  }
}

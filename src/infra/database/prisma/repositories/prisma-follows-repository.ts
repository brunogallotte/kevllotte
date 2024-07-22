import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { FollowsRepository } from '@/domain/blog/application/repositories/follows-repository'
import type { Follow } from '@/domain/blog/enterprise/entities/follow'
import { prisma } from '@/lib/prisma'

import { PrismaFollowMapper } from '../mappers/prisma-follow-mapper'

export class PrismaFollowsRepository implements FollowsRepository {
  async findById(id: string) {
    const follow = await prisma.follow.findUnique({
      where: {
        id,
      },
    })

    if (!follow) {
      return null
    }

    return PrismaFollowMapper.toDomain(follow)
  }

  async findManyFollowersByAuthorId(
    authorId: string,
    { page }: PaginationParams,
  ) {
    const followers = await prisma.follow.findMany({
      where: {
        followingUserId: authorId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return followers.map((follower) => PrismaFollowMapper.toDomain(follower))
  }

  async findManyFollowingsByAuthorId(
    authorId: string,
    { page }: PaginationParams,
  ) {
    const followings = await prisma.follow.findMany({
      where: {
        followerUserId: authorId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return followings.map((following) => PrismaFollowMapper.toDomain(following))
  }

  async create(follow: Follow) {
    const data = PrismaFollowMapper.toPrisma(follow)

    await prisma.follow.create({
      data,
    })
  }

  async delete(follow: Follow) {
    const data = PrismaFollowMapper.toPrisma(follow)

    await prisma.follow.delete({
      where: {
        id: data.id,
      },
    })
  }
}

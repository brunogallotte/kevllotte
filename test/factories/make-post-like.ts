import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  PostLike,
  type PostLikeProps,
} from '@/domain/blog/enterprise/entities/post-like'
import { PrismaPostLikeMapper } from '@/infra/database/prisma/mappers/prisma-post-like-mapper'
import { prisma } from '@/lib/prisma'

export function makePostLike(
  override: Partial<PostLikeProps> = {},
  id?: UniqueEntityID,
) {
  const postLike = PostLike.create(
    {
      authorId: new UniqueEntityID(),
      postId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return postLike
}

export class PostLikeFactory {
  async makePrismaPostLike(
    data: Partial<PostLikeProps> = {},
  ): Promise<PostLike> {
    const postLike = makePostLike(data)

    await prisma.postLike.create({
      data: PrismaPostLikeMapper.toPrisma(postLike),
    })

    return postLike
  }
}

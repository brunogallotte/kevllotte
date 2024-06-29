import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  PostComment,
  type PostCommentProps,
} from '@/domain/blog/enterprise/entities/post-comment'
import { PrismaPostCommentMapper } from '@/infra/database/prisma/mappers/prisma-post-comment-mapper'
import { prisma } from '@/lib/prisma'

export function makePostComment(
  override: Partial<PostCommentProps> = {},
  id?: UniqueEntityID,
) {
  const postComment = PostComment.create(
    {
      authorId: new UniqueEntityID(),
      postId: new UniqueEntityID(),
      content: faker.lorem.sentence(15),
      ...override,
    },
    id,
  )

  return postComment
}

export class PostCommentFactory {
  async makePrismaPostComment(
    data: Partial<PostCommentProps> = {},
  ): Promise<PostComment> {
    const postComment = makePostComment(data)

    await prisma.postComment.create({
      data: PrismaPostCommentMapper.toPrisma(postComment),
    })

    return postComment
  }
}

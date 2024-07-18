import type { Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Post, POST_STATUS } from '@/domain/blog/enterprise/entities/post'
import { PostLike } from '@/domain/blog/enterprise/entities/post-like'
import { Slug } from '@/domain/blog/enterprise/entities/value-objects/slug'

import type { PrismaPostWithLikes } from './prisma-post-mapper'

export class PrismaSavedPostMapper {
  static toDomain(raw: PrismaPostWithLikes): Post {
    return Post.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new UniqueEntityID(raw.userId),
        status: POST_STATUS[raw.status],
        collabId: raw.collabId ? new UniqueEntityID(raw.collabId) : undefined,
        slug: Slug.create(raw.slug),
        likes: raw.likes.map((like) =>
          PostLike.create({
            authorId: new UniqueEntityID(like.userId),
            postId: new UniqueEntityID(like.postId),
            createdAt: like.createdAt,
          }),
        ),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(post: Post): Prisma.SavedPostUncheckedCreateInput {
    return {
      postId: post.id.toString(),
      userId: post.authorId.toString(),
      createdAt: post.createdAt,
    }
  }
}

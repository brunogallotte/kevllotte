import type {
  Post as PrismaPost,
  PostLike as PrismaPostLike,
  PostStatus,
  Prisma,
} from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Post, POST_STATUS } from '@/domain/blog/enterprise/entities/post'
import { PostLike } from '@/domain/blog/enterprise/entities/post-like'
import { Slug } from '@/domain/blog/enterprise/entities/value-objects/slug'

type PrismaPostWithLikes = PrismaPost & {
  likes: PrismaPostLike[]
}

export class PrismaPostMapper {
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

  static toPrisma(post: Post): Prisma.PostUncheckedCreateInput {
    return {
      id: post.id.toString(),
      title: post.title,
      content: post.content,
      userId: post.authorId.toString(),
      status: POST_STATUS[post.status] as PostStatus,
      collabId: post.collabId?.toString() ?? undefined,
      slug: post.slug.value,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt ?? undefined,
    }
  }
}

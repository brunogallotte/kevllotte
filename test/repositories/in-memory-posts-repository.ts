import type { Post, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import type { PostsRepository } from '@/domain/blog/application/repositories/posts-repository'

export class InMemoryPostsRepository implements PostsRepository {
  public items: Post[] = []

  async findById(id: string) {
    const post = this.items.find((post) => post.id === id)

    if (!post) {
      return null
    }

    return post
  }

  async create(data: Prisma.PostUncheckedCreateInput) {
    const post = {
      id: data.id ?? randomUUID(),
      content: data.content,
      status: data.status ?? 'DRAFT',
      collabId: data.collabId ?? null,
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
      title: data.title,
      userId: data.userId,
    }

    this.items.push(post)

    return post
  }

  async update(data: Post) {
    const postToUpdateIndex = this.items.findIndex(
      (item) => item.id === data.id,
    )

    const updatedPost = {
      ...data,
    }

    this.items.splice(postToUpdateIndex, 1, updatedPost)

    return updatedPost
  }
}

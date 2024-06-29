import { CommentOnPostUseCase } from '@/domain/blog/application/use-cases/comment-on-post'

import { PrismaPostCommentsRepository } from '../repositories/prisma-post-comments-repository'
import { PrismaPostsRepository } from '../repositories/prisma-posts-repository'

export function makeCommentOnPostUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const postCommentsRepository = new PrismaPostCommentsRepository()

  const commentOnPostUseCase = new CommentOnPostUseCase(
    postsRepository,
    postCommentsRepository,
  )

  return commentOnPostUseCase
}

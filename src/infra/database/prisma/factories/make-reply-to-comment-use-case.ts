import { ReplyToCommentUseCase } from '@/domain/blog/application/use-cases/reply-to-comment'

import { PrismaPostCommentsRepository } from '../repositories/prisma-post-comments-repository'
import { PrismaPostsRepository } from '../repositories/prisma-posts-repository'

export function makeReplyToCommentUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const postCommentsRepository = new PrismaPostCommentsRepository()

  const replyToCommentUseCase = new ReplyToCommentUseCase(
    postsRepository,
    postCommentsRepository,
  )

  return replyToCommentUseCase
}

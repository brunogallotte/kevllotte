import { LikeCommentUseCase } from '@/domain/blog/application/use-cases/like-comment'

import { PrismaCommentLikesRepository } from '../repositories/prisma-comment-likes-repository'
import { PrismaPostCommentsRepository } from '../repositories/prisma-post-comments-repository'

export function makeLikeCommentUseCase() {
  const postCommentsRepository = new PrismaPostCommentsRepository()
  const commentLikesRepository = new PrismaCommentLikesRepository()

  const likeCommentUseCase = new LikeCommentUseCase(
    postCommentsRepository,
    commentLikesRepository,
  )

  return likeCommentUseCase
}

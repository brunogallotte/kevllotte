import { DislikeCommentUseCase } from '@/domain/blog/application/use-cases/dislike-comment'

import { PrismaCommentLikesRepository } from '../repositories/prisma-comment-likes-repository'

export function makeDislikeCommentUseCase() {
  const commentLikesRepository = new PrismaCommentLikesRepository()

  const dislikeCommentUseCase = new DislikeCommentUseCase(
    commentLikesRepository,
  )

  return dislikeCommentUseCase
}

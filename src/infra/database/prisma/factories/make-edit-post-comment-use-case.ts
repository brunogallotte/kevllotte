import { EditPostCommentUseCase } from '@/domain/blog/application/use-cases/edit-post-comment'

import { PrismaPostCommentsRepository } from '../repositories/prisma-post-comments-repository'

export function makeEditPostCommentUseCase() {
  const postCommentsRepository = new PrismaPostCommentsRepository()

  const editPostCommentUseCase = new EditPostCommentUseCase(
    postCommentsRepository,
  )

  return editPostCommentUseCase
}

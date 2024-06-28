import { EditAuthorProfileUseCase } from '@/domain/blog/application/use-cases/edit-author-profile'

import { PrismaAuthorsRepository } from '../repositories/prisma-authors-repository'

export function makeEditAuthorProfileUseCase() {
  const authorsRepository = new PrismaAuthorsRepository()

  const editAuthorProfileUseCase = new EditAuthorProfileUseCase(
    authorsRepository,
  )

  return editAuthorProfileUseCase
}

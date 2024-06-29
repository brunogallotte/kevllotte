import { DeleteAuthorUseCase } from '@/domain/blog/application/use-cases/delete-author'

import { PrismaAuthorsRepository } from '../repositories/prisma-authors-repository'

export function makeDeleteAuthorUseCase() {
  const authorsRepository = new PrismaAuthorsRepository()

  const deleteAuthorUseCase = new DeleteAuthorUseCase(authorsRepository)

  return deleteAuthorUseCase
}

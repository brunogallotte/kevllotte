import { GetAuthorProfileUseCase } from '../../../../domain/blog/application/use-cases/get-author-profile'
import { PrismaAuthorsRepository } from '../repositories/prisma-authors-repository'

export function makeGetAuthorProfileUseCase() {
  const authorsRepository = new PrismaAuthorsRepository()

  const getAuthorProfileUseCase = new GetAuthorProfileUseCase(authorsRepository)

  return getAuthorProfileUseCase
}

import { AuthenticateUseCase } from '../../../../domain/blog/application/use-cases/authenticate'
import { PrismaUsersRepository } from '../repositories/prisma-users-repository'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}

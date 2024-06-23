import { RegisterUseCase } from '../../../../domain/blog/application/use-cases/register'
import { PrismaUsersRepository } from '../repositories/prisma-users-repository'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}

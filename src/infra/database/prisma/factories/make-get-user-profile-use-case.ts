import { GetUserProfileUseCase } from '../../../../domain/blog/application/use-cases/get-user-profile'
import { PrismaUsersRepository } from '../repositories/prisma-users-repository'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return getUserProfileUseCase
}

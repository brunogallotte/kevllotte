import { DeleteUserUseCase } from '../../../../domain/blog/application/use-cases/delete-user'
import { PrismaUsersRepository } from '../repositories/prisma-users-repository'

export function makeDeleteUserUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const deleteUserUseCase = new DeleteUserUseCase(usersRepository)

  return deleteUserUseCase
}

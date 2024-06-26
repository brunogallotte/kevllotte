import { RegisterAuthorUseCase } from '@/domain/blog/application/use-cases/register-author'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'

import { PrismaAuthorsRepository } from '../repositories/prisma-authors-repository'

export function makeRegisterAuthorUseCase() {
  const authorsRepository = new PrismaAuthorsRepository()
  const hashGenerator = new BcryptHasher()

  const registerUseCase = new RegisterAuthorUseCase(
    authorsRepository,
    hashGenerator,
  )

  return registerUseCase
}

import type { FastifyReply } from 'fastify'

import { AuthenticateAuthorUseCase } from '@/domain/blog/application/use-cases/authenticate-author'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'

import { PrismaAuthorsRepository } from '../repositories/prisma-authors-repository'

export function makeAuthenticateAuthorUseCase(reply: FastifyReply) {
  const authorsRepository = new PrismaAuthorsRepository()
  const hashComparer = new BcryptHasher()
  const encrypter = new JwtEncrypter(reply)

  const authenticateAuthorUseCase = new AuthenticateAuthorUseCase(
    authorsRepository,
    hashComparer,
    encrypter,
  )

  return authenticateAuthorUseCase
}

import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { AuthenticateUseCase } from './authenticate'
import { RegisterUseCase } from './register'

describe('Authenticate Use Case', async () => {
  let usersRepository: InMemoryUsersRepository
  let registerUseCase: RegisterUseCase
  let sut: AuthenticateUseCase
  let email: string

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
    sut = new AuthenticateUseCase(usersRepository)
    email = 'john.doe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456789',
      bio: 'Hello, I am John Doe',
      avatarUrl: 'https://github.com/johndoe.png',
      githubUrl: 'https://github.com/johndoe',
      linkedinUrl: 'https://linkedin.com/in/johndoe',
      instagramUrl: 'https://instagram.com/johndoe',
      twitterUrl: 'https://twitter.com/johndoe',
      websiteUrl: 'https://johndoe.com',
    })
  })

  it('should return success when authenticating an existing user', async () => {
    const authenticateUser = await sut.execute({
      email,
      password: '123456789',
    })

    if (authenticateUser.isRight()) {
      const { user } = authenticateUser.value

      expect(user.id).toEqual(expect.any(String))
    }
  })

  it('should return error when authenticating a non-existing user', async () => {
    const authenticateUser = await sut.execute({
      email: 'inexistent-email@example.com',
      password: '123456789',
    })

    if (authenticateUser.isLeft()) {
      expect(authenticateUser.value).toBeInstanceOf(ResourceNotFoundError)
    }
  })

  it('should return error when authenticating a wrong password', async () => {
    const authenticateUser = await sut.execute({
      email,
      password: 'wrong-password',
    })

    if (authenticateUser.isLeft()) {
      expect(authenticateUser.value).toBeInstanceOf(ResourceNotFoundError)
    }
  })
})

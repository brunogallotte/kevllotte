import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { GetUserProfileUseCase } from './get-user-profile'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able to get user profile', async () => {
    const passwordHash = await hash('123456', 1)

    const createdUser = await inMemoryUsersRepository.create({
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: passwordHash,
    })

    const result = await sut.execute({
      userId: createdUser.id,
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.user).toMatchObject(createdUser)
    }
  })

  it('should not be able to get user profile with wrong id', async () => {
    const result = await sut.execute({
      userId: 'non-existing-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

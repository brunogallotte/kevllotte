import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { EditUserProfileUseCase } from './edit-user-profile'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: EditUserProfileUseCase

describe('Edit User Profile', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new EditUserProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able to edit user profile', async () => {
    const passwordHash = await hash('123456', 1)

    const createdUser = await inMemoryUsersRepository.create({
      name: faker.person.firstName(),
      email: faker.internet.email(),
      bio: 'Testing bio before editing',
      password: passwordHash,
    })

    const result = await sut.execute({
      userId: createdUser.id,
      bio: 'Bio edited',
      name: 'John Doe',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.updatedUser.bio).toEqual('Bio edited')
      expect(result.value.updatedUser.name).toEqual('John Doe')
    }
  })

  it('should not be able to edit a user profile that not exist', async () => {
    const result = await sut.execute({
      userId: 'non-existing-id',
      bio: 'Bio edited',
      name: 'John Doe',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

import { makeRegister } from 'test/factories/makeRegister'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { DeleteUserUseCase } from './delete-user'

let inMemoryUsersRepository: InMemoryUsersRepository

let sut: DeleteUserUseCase

describe('Delete User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new DeleteUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to delete a user', async () => {
    const user = makeRegister()

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      userId: user.id,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a user with an non existing user id', async () => {
    makeRegister({
      id: 'user-1',
    })

    const result = await sut.execute({
      userId: 'non-existing-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

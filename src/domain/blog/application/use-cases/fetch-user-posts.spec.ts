import { makePost } from 'test/factories/makePost'
import { makeRegister } from 'test/factories/makeRegister'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-posts-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { FetchUserPostsUseCase } from './fetch-user-posts'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryPostsRepository: InMemoryPostsRepository
let sut: FetchUserPostsUseCase

describe('Fetch User Posts', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new FetchUserPostsUseCase(inMemoryPostsRepository)
  })

  it('should be able to fetch user posts', async () => {
    const user = makeRegister()

    inMemoryUsersRepository.create(user)

    await inMemoryPostsRepository.create(
      makePost({
        userId: user.id,
      }),
    )

    await inMemoryPostsRepository.create(
      makePost({
        userId: user.id,
      }),
    )

    await inMemoryPostsRepository.create(
      makePost({
        userId: user.id,
      }),
    )

    const result = await sut.execute({
      userId: user.id,
      page: 1,
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.posts).toHaveLength(3)
    }
  })

  it('should be able to fetch paginated user posts', async () => {
    const user = makeRegister()

    inMemoryUsersRepository.create(user)

    for (let i = 1; i <= 22; i++) {
      await inMemoryPostsRepository.create(
        makePost({
          userId: user.id,
        }),
      )
    }

    const result = await sut.execute({
      userId: user.id,
      page: 2,
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.posts).toHaveLength(2)
    }
  })
})

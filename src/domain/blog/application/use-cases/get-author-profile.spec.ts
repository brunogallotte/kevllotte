import { makeAuthor } from 'test/factories/make-author'
import { InMemoryAuthorsRepository } from 'test/repositories/in-memory-authors-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { GetAuthorProfileUseCase } from './get-author-profile'

let inMemoryAuthorsRepository: InMemoryAuthorsRepository
let sut: GetAuthorProfileUseCase

describe('Get Author Profile', () => {
  beforeEach(() => {
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository()
    sut = new GetAuthorProfileUseCase(inMemoryAuthorsRepository)
  })

  it('should be able to get author profile', async () => {
    const author = makeAuthor()

    inMemoryAuthorsRepository.items.push(author)

    const result = await sut.execute({
      authorId: author.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      author: inMemoryAuthorsRepository.items[0],
    })
  })

  it('should not be able to get author profile with wrong id', async () => {
    const result = await sut.execute({
      authorId: 'non-existing-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

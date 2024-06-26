import { makeAuthor } from 'test/factories/make-author'
import { InMemoryAuthorsRepository } from 'test/repositories/in-memory-authors-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { DeleteAuthorUseCase } from './delete-author'

let inMemoryAuthorsRepository: InMemoryAuthorsRepository

let sut: DeleteAuthorUseCase

describe('Delete Author', () => {
  beforeEach(() => {
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository()

    sut = new DeleteAuthorUseCase(inMemoryAuthorsRepository)
  })

  it('should be able to delete an author', async () => {
    const author = makeAuthor()

    await inMemoryAuthorsRepository.create(author)

    const result = await sut.execute({
      authorId: author.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAuthorsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an author with an non existing author id', async () => {
    const result = await sut.execute({
      authorId: 'non-existing-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

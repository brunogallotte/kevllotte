import { makeAuthor } from 'test/factories/make-author'
import { InMemoryAuthorsRepository } from 'test/repositories/in-memory-authors-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { EditAuthorProfileUseCase } from './edit-author-profile'

let inMemoryAuthorsRepository: InMemoryAuthorsRepository
let sut: EditAuthorProfileUseCase

describe('Edit Author Profile', () => {
  beforeEach(() => {
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository()

    sut = new EditAuthorProfileUseCase(inMemoryAuthorsRepository)
  })

  it('should be able to edit an author profile', async () => {
    const author = makeAuthor()

    await inMemoryAuthorsRepository.create(author)

    const result = await sut.execute({
      authorId: author.id.toString(),
      name: 'John Doe',
      bio: 'John Doe bio',
      avatarUrl: 'https://jonh-doe-avatar-url.com',
      linkedinUrl: 'https://linkedin.com/in',
      githubUrl: 'https://github.com',
      instagramUrl: 'https://instagram.com',
      twitterUrl: 'https://twitter.com',
      websiteUrl: 'https://jonh-doe-website.com',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAuthorsRepository.items[0].name).toEqual('John Doe')
    expect(inMemoryAuthorsRepository.items[0].bio).toEqual('John Doe bio')
    expect(inMemoryAuthorsRepository.items[0].websiteUrl).toEqual(
      'https://jonh-doe-website.com',
    )
  })

  it('should not be able to edit an author profile that not exists', async () => {
    const result = await sut.execute({
      authorId: 'non-existing-id',
      name: 'John Doe',
      bio: 'John Doe Bio',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

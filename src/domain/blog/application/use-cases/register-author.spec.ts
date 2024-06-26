import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryAuthorsRepository } from 'test/repositories/in-memory-authors-repository'

import { RegisterAuthorUseCase } from './register-author'

let inMemoryAuthorsRepository: InMemoryAuthorsRepository
let fakeHasher: FakeHasher
let sut: RegisterAuthorUseCase

describe('Register Author', () => {
  beforeEach(() => {
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository()
    fakeHasher = new FakeHasher()

    sut = new RegisterAuthorUseCase(inMemoryAuthorsRepository, fakeHasher)
  })

  it('should be able to register a new author', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
      bio: null,
      avatarUrl: null,
      linkedinUrl: null,
      githubUrl: null,
      instagramUrl: null,
      twitterUrl: null,
      websiteUrl: null,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      author: inMemoryAuthorsRepository.items[0],
    })
  })

  it('should hash author password uppon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
      bio: null,
      avatarUrl: null,
      linkedinUrl: null,
      githubUrl: null,
      instagramUrl: null,
      twitterUrl: null,
      websiteUrl: null,
    })

    const hashedPassword = await fakeHasher.hash('12345678')

    expect(result.isRight())
    expect(inMemoryAuthorsRepository.items[0].password).toEqual(hashedPassword)
  })
})

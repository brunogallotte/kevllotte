import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeAuthor } from 'test/factories/make-author'
import { InMemoryAuthorsRepository } from 'test/repositories/in-memory-authors-repository'

import { AuthenticateAuthorUseCase } from './authenticate-author'

let inMemoryAuthorsRepository: InMemoryAuthorsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateAuthorUseCase

describe('Authenticate Author', () => {
  beforeEach(() => {
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateAuthorUseCase(
      inMemoryAuthorsRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a author', async () => {
    const author = makeAuthor({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('12345678'),
    })

    inMemoryAuthorsRepository.items.push(author)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '12345678',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    })
  })
})

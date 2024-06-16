import { compare } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { makeRegister } from 'test/factories/makeRegister'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register-use-case'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(inMemoryUsersRepository)
  })

  it('should be able to register', async () => {
    const result = await sut.execute({
      id: randomUUID(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0].name).toEqual('John Doe')
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute(
      makeRegister({
        email: 'johndoe@example.com',
      }),
    )

    const result = await sut.execute(
      makeRegister({
        email: 'johndoe@example.com',
      }),
    )

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should hash the password', async () => {
    const result = await sut.execute(
      makeRegister({
        password: '123456',
      }),
    )

    expect(result.isRight())

    if (result.isRight()) {
      const isPasswordCorrectlyHashed = await compare(
        '123456',
        result.value.user.password,
      )

      expect(isPasswordCorrectlyHashed).toBe(true)
    }
  })
})

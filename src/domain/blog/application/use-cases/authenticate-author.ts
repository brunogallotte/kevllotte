import { Either, left, right } from '@/core/either'

import type { Encrypter } from '../cryptography/encrypter'
import type { HashComparer } from '../cryptography/hash-comparer'
import type { AuthorsRepository } from '../repositories/authors-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

type AuthenticateAuthorUseCaseRequest = {
  email: string
  password: string
}

type AuthenticateAuthorUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
    refreshToken: string
  }
>

export class AuthenticateAuthorUseCase {
  constructor(
    private authorsRepository: AuthorsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateAuthorUseCaseRequest): Promise<AuthenticateAuthorUseCaseResponse> {
    const author = await this.authorsRepository.findByEmail(email)

    if (!author) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      author.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: author.id.toString(),
    })

    const refreshToken = await this.encrypter.encrypt({
      sub: author.id.toString(),
      expiresIn: '7d',
    })

    return right({ accessToken, refreshToken })
  }
}

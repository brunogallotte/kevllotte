import { Either, left, right } from '@/core/either'

import { Author } from '../../enterprise/entities/author'
import type { HashGenerator } from '../cryptography/hash-generator'
import type { AuthorsRepository } from '../repositories/authors-repository'
import { AuthorAlreadyExistsError } from './errors/author-already-exists-error'

export type RegisterAuthorUseCaseRequest = {
  name: string
  email: string
  username: string
  password: string
  bio: string | null
  avatarUrl: string | null
  linkedinUrl: string | null
  githubUrl: string | null
  instagramUrl: string | null
  twitterUrl: string | null
  websiteUrl: string | null
}

type RegisterAuthorUseCaseResponse = Either<
  AuthorAlreadyExistsError,
  {
    author: Author
  }
>

export class RegisterAuthorUseCase {
  constructor(
    private authorsRepository: AuthorsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    username,
    password,
    bio,
    avatarUrl,
    linkedinUrl,
    githubUrl,
    instagramUrl,
    twitterUrl,
    websiteUrl,
  }: RegisterAuthorUseCaseRequest): Promise<RegisterAuthorUseCaseResponse> {
    const userWithSameEmail = await this.authorsRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new AuthorAlreadyExistsError(email))
    }

    const userWithSameUsername =
      await this.authorsRepository.findByUsername(username)

    if (userWithSameUsername) {
      return left(new AuthorAlreadyExistsError(username))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const author = Author.create({
      name,
      email,
      username,
      password: hashedPassword,
      bio: bio ?? null,
      avatarUrl: avatarUrl ?? null,
      linkedinUrl: linkedinUrl ?? null,
      githubUrl: githubUrl ?? null,
      instagramUrl: instagramUrl ?? null,
      twitterUrl: twitterUrl ?? null,
      websiteUrl: websiteUrl ?? null,
    })

    await this.authorsRepository.create(author)

    return right({ author })
  }
}

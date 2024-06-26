import type { UseCaseError } from '@/core/types/use-case-error'

export class AuthorAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Author ${identifier} already exists.`)
  }
}

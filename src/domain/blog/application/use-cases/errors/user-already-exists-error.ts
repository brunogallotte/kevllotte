import type { UseCaseError } from '@/core/types/use-case-error'

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('E-mail already exists.')
  }
}

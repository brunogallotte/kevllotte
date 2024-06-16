import type { UseCaseError } from '@/core/types/use-case-error'

export class UserNotFound extends Error implements UseCaseError {
  constructor() {
    super('User not found.')
  }
}

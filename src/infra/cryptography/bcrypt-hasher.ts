import { compare, hash } from 'bcryptjs'

import type { HashComparer } from '@/domain/blog/application/cryptography/hash-comparer'
import type { HashGenerator } from '@/domain/blog/application/cryptography/hash-generator'

export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8

  async hash(plain: string) {
    return await hash(plain, this.HASH_SALT_LENGTH)
  }

  async compare(plain: string, hash: string) {
    return await compare(plain, hash)
  }
}

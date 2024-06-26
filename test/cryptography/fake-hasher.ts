import type { HashComparer } from '@/domain/blog/application/cryptography/hash-comparer'
import type { HashGenerator } from '@/domain/blog/application/cryptography/hash-generator'

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(plain: string) {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string) {
    return plain.concat('-hashed') === hash
  }
}

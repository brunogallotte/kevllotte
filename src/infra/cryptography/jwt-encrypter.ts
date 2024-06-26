import type { FastifyReply } from 'fastify'

import type { Encrypter } from '@/domain/blog/application/cryptography/encrypter'

export class JwtEncrypter implements Encrypter {
  constructor(private reply: FastifyReply) {}

  async encrypt(payload: Record<string, unknown>) {
    return await this.reply.jwtSign({}, payload)
  }
}

import { FastifyRequest } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}

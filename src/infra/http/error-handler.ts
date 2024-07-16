import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      errors: error,
    })
  }

  if (error instanceof ResourceNotFoundError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof NotAllowedError) {
    return reply.status(401).send({
      message: error.message,
    })
  }

  console.error(error)

  return reply
    .status(500)
    .send({ message: 'Internal server error', error: error.message })
}

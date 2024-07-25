import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateAuthorReportUseCase } from '@/infra/database/prisma/factories/make-create-author-report-use-case'

import { AuthorReportPresenter } from '../../presenters/author-report-presenter'
import {
  createAuthorReportBodySchema,
  createAuthorReportParamsSchema,
} from './schemas'

export async function report(request: FastifyRequest, reply: FastifyReply) {
  const authorId = await request.getCurrentUserId()

  const createAuthorReportUseCase = makeCreateAuthorReportUseCase()

  const { reportedAuthorId } = createAuthorReportParamsSchema.parse(
    request.params,
  )

  const { reason, description } = createAuthorReportBodySchema.parse(
    request.body,
  )

  const result = await createAuthorReportUseCase.execute({
    reportedById: authorId,
    reportedAuthorId,
    reason,
    description,
  })

  if (result.isLeft()) {
    return reply.status(400).send()
  }

  const authorReport = result.value.authorReport

  return reply
    .status(201)
    .send({ report: AuthorReportPresenter.toHTTP(authorReport) })
}

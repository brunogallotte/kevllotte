import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateReportUseCase } from '@/infra/database/prisma/factories/make-create-report-use-case'

import { ReportPresenter } from '../../presenters/report-presenter'
import { createReportBodySchema } from './schemas'

export async function report(request: FastifyRequest, reply: FastifyReply) {
  const authorId = await request.getCurrentUserId()

  const createReportUseCase = makeCreateReportUseCase()

  const { reportedAuthorId, reason, description } =
    createReportBodySchema.parse(request.body)

  const result = await createReportUseCase.execute({
    reportedById: authorId,
    reportedAuthorId,
    reason,
    description,
  })

  if (result.isLeft()) {
    return reply.status(400).send()
  }

  const report = result.value.report

  return reply.status(201).send({ report: ReportPresenter.toHTTP(report) })
}

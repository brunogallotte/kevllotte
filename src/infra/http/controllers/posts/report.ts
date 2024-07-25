import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreatePostReportUseCase } from '@/infra/database/prisma/factories/make-create-post-report-use-case'

import { PostReportPresenter } from '../../presenters/post-report-presenter'
import {
  createPostReportBodySchema,
  createPostReportParamsSchema,
} from './schemas'

export async function report(request: FastifyRequest, reply: FastifyReply) {
  const authorId = await request.getCurrentUserId()

  const createPostReportUseCase = makeCreatePostReportUseCase()

  const { reportedPostId } = createPostReportParamsSchema.parse(request.params)

  const { reason, description } = createPostReportBodySchema.parse(request.body)

  const result = await createPostReportUseCase.execute({
    reportedById: authorId,
    reportedPostId,
    reason,
    description,
  })

  if (result.isLeft()) {
    return reply.status(400).send()
  }

  const postReport = result.value.postReport

  return reply
    .status(201)
    .send({ report: PostReportPresenter.toHTTP(postReport) })
}

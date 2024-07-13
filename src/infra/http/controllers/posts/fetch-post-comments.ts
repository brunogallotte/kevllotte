import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchPostCommentsUseCase } from '@/infra/database/prisma/factories/make-fetch-post-comments'

import { PostCommentPresenter } from '../../presenters/post-comment-presenter'
import { fetchPostCommentsParamsSchema, paginationQuerySchema } from './schemas'

export async function fetchPostComments(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { postId } = fetchPostCommentsParamsSchema.parse(request.params)

  const { page } = paginationQuerySchema.parse(request.query)

  const fetchPostCommentsUseCase = makeFetchPostCommentsUseCase()

  const result = await fetchPostCommentsUseCase.execute({
    postId,
    page,
  })

  if (result.isLeft()) {
    return reply.status(400).send()
  }

  const postComments = result.value.postComments

  return reply.status(200).send({
    postComments: postComments.map((postComment) =>
      PostCommentPresenter.toHTTP(postComment),
    ),
  })
}

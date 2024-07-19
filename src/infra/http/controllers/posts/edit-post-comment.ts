import { FastifyReply, FastifyRequest } from 'fastify'

import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeEditPostCommentUseCase } from '@/infra/database/prisma/factories/make-edit-post-comment-use-case'

import { PostCommentPresenter } from '../../presenters/post-comment-presenter'
import {
  editPostCommentBodySchema,
  editPostCommentParamsSchema,
} from './schemas'

export async function editComment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authorId = await request.getCurrentUserId()

  const { content } = editPostCommentBodySchema.parse(request.body)

  const { commentId } = editPostCommentParamsSchema.parse(request.params)

  const editPostCommentUseCase = makeEditPostCommentUseCase()

  const result = await editPostCommentUseCase.execute({
    authorId,
    commentId,
    content,
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.constructor) {
      case ResourceNotFoundError:
        return reply.status(404).send(error.message)
      case NotAllowedError:
        return reply.status(401).send(error.message)
      default:
        return reply.status(400).send(error.message)
    }
  }

  const postComment = result.value.postComment

  return reply
    .status(200)
    .send({ postComment: PostCommentPresenter.toHTTP(postComment) })
}

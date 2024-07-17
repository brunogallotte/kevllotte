import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchPostsUseCase } from '@/infra/database/prisma/factories/make-fetch-posts-use-case'

import { PostPresenter } from '../../presenters/post-presenter'
import { paginationQuerySchema } from '../schemas'

export async function fetchPosts(request: FastifyRequest, reply: FastifyReply) {
  const { page } = paginationQuerySchema.parse(request.query)

  const fetchPostsUseCase = makeFetchPostsUseCase()

  const result = await fetchPostsUseCase.execute({
    page,
  })

  if (result.isLeft()) {
    return reply.status(400).send()
  }

  const posts = result.value.posts

  return reply
    .status(200)
    .send({ posts: posts.map((post) => PostPresenter.toHTTP(post)) })
}

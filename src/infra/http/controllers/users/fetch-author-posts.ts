import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchAuthorPostsUseCase } from '@/infra/database/prisma/factories/make-fetch-author-posts-use-case'

import { PostPresenter } from '../../presenters/post-presenter'
import { fetchAuthorPostsQuerySchema } from './schemas'

export async function fetchPosts(request: FastifyRequest, reply: FastifyReply) {
  const authorId = await request.getCurrentUserId()

  const { page } = fetchAuthorPostsQuerySchema.parse(request.query)

  const fetchAuthorPostsUseCase = makeFetchAuthorPostsUseCase()

  const result = await fetchAuthorPostsUseCase.execute({
    authorId,
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

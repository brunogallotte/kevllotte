import { makePost } from 'test/factories/make-post'
import { makePostTag } from 'test/factories/make-post-tag'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-posts-repository'
import { InMemoryTagsRepository } from 'test/repositories/in-memory-tags-repository'

import { FetchPostTagsUseCase } from './fetch-post-tags'

let inMemoryTagsRepository: InMemoryTagsRepository
let inMemoryPostsRepository: InMemoryPostsRepository

let sut: FetchPostTagsUseCase

describe('Fetch Post Tags', () => {
  beforeEach(() => {
    inMemoryTagsRepository = new InMemoryTagsRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository()

    sut = new FetchPostTagsUseCase(inMemoryTagsRepository)
  })

  it('should be able to fetch post tags', async () => {
    const post = makePost()

    await inMemoryTagsRepository.create(
      makePostTag({
        name: 'Tag 01',
        postId: post.id,
      }),
    )

    await inMemoryTagsRepository.create(
      makePostTag({
        name: 'Tag 02',
        postId: post.id,
      }),
    )

    await inMemoryTagsRepository.create(
      makePostTag({
        name: 'Tag 03',
        postId: post.id,
      }),
    )

    const result = await sut.execute({
      postId: post.id.toString(),
      page: 1,
    })

    expect(result.value?.tags).toHaveLength(3)
  })

  it('should be able to fetch paginated post tags', async () => {
    const post = makePost()

    await inMemoryPostsRepository.create(post)

    for (let i = 1; i <= 22; i++) {
      await inMemoryTagsRepository.create(
        makePostTag({
          postId: post.id,
        }),
      )
    }

    const result = await sut.execute({
      postId: post.id.toString(),
      page: 2,
    })

    expect(result.value?.tags).toHaveLength(2)
  })
})

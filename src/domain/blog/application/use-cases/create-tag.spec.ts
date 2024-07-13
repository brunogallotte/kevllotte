import { InMemoryTagsRepository } from 'test/repositories/in-memory-tags-repository'

import { CreateTagUseCase } from './create-tag'

let inMemoryTagsRepository: InMemoryTagsRepository
let sut: CreateTagUseCase

describe('Create Tag', () => {
  beforeEach(() => {
    inMemoryTagsRepository = new InMemoryTagsRepository()

    sut = new CreateTagUseCase(inMemoryTagsRepository)
  })

  it('should be able to create a tag', async () => {
    const result = await sut.execute({
      postId: 'post-01',
      name: 'New tag',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryTagsRepository.items[0]).toEqual(result.value?.tag)
  })
})

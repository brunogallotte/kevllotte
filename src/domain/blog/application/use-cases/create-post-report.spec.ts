import { InMemoryPostReportsRepository } from 'test/repositories/in-memory-post-reports-repository'

import { CreatePostReportUseCase } from './create-post-report'

let inMemoryPostReportsRepository: InMemoryPostReportsRepository
let sut: CreatePostReportUseCase

describe('Create Post Report', () => {
  beforeEach(() => {
    inMemoryPostReportsRepository = new InMemoryPostReportsRepository()

    sut = new CreatePostReportUseCase(inMemoryPostReportsRepository)
  })

  it('should be able to create an post report', async () => {
    const result = await sut.execute({
      reportedById: 'post-01',
      reportedPostId: 'post-02',
      reason: 'Report reason',
      description: 'Report description',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPostReportsRepository.items[0]).toEqual(
      result.value?.postReport,
    )
  })
})

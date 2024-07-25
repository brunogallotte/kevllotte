import { InMemoryAuthorReportsRepository } from 'test/repositories/in-memory-author-reports-repository'

import { CreateAuthorReportUseCase } from './create-author-report'

let inMemoryAuthorReportsRepository: InMemoryAuthorReportsRepository
let sut: CreateAuthorReportUseCase

describe('Create Author Report', () => {
  beforeEach(() => {
    inMemoryAuthorReportsRepository = new InMemoryAuthorReportsRepository()

    sut = new CreateAuthorReportUseCase(inMemoryAuthorReportsRepository)
  })

  it('should be able to create an author report', async () => {
    const result = await sut.execute({
      reportedById: 'author-01',
      reportedAuthorId: 'author-02',
      reason: 'Report reason',
      description: 'Report description',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAuthorReportsRepository.items[0]).toEqual(
      result.value?.authorReport,
    )
  })
})

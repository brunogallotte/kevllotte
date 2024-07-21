import { InMemoryReportsRepository } from 'test/repositories/in-memory-reports-repository'

import { CreateReportUseCase } from './create-report'

let inMemoryReportsRepository: InMemoryReportsRepository
let sut: CreateReportUseCase

describe('Create Report', () => {
  beforeEach(() => {
    inMemoryReportsRepository = new InMemoryReportsRepository()

    sut = new CreateReportUseCase(inMemoryReportsRepository)
  })

  it('should be able to create a report', async () => {
    const result = await sut.execute({
      reportedById: 'author-01',
      reportedAuthorId: 'author-02',
      reason: 'Report reason',
      description: 'Report description',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryReportsRepository.items[0]).toEqual(result.value?.report)
  })
})

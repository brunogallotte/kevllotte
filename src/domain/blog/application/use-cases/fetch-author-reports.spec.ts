import { makeReport } from 'test/factories/make-report'
import { InMemoryReportsRepository } from 'test/repositories/in-memory-reports-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FetchAuthorReportsUseCase } from './fetch-author-reports'

let inMemoryReportsRepository: InMemoryReportsRepository
let sut: FetchAuthorReportsUseCase

describe('Fetch Author Reports', () => {
  beforeEach(() => {
    inMemoryReportsRepository = new InMemoryReportsRepository()

    sut = new FetchAuthorReportsUseCase(inMemoryReportsRepository)
  })

  it('should be able to fetch author reports', async () => {
    await inMemoryReportsRepository.create(
      makeReport({
        reportedById: new UniqueEntityID('author-1'),
      }),
    )

    await inMemoryReportsRepository.create(
      makeReport({
        reportedById: new UniqueEntityID('author-1'),
      }),
    )

    await inMemoryReportsRepository.create(
      makeReport({
        reportedById: new UniqueEntityID('author-1'),
      }),
    )

    const result = await sut.execute({
      authorId: 'author-1',
      page: 1,
    })

    expect(result.value?.reports).toHaveLength(3)
  })

  it('should be able to fetch paginated author reports', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryReportsRepository.create(
        makeReport({
          reportedById: new UniqueEntityID('author-1'),
        }),
      )
    }

    const result = await sut.execute({
      authorId: 'author-1',
      page: 2,
    })

    expect(result.value?.reports).toHaveLength(2)
  })
})

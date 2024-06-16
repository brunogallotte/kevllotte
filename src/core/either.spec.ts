import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10)
  } else {
    return left('error')
  }
}

describe('Either', () => {
  it('should be able to have a success result', () => {
    const result = doSomething(true)

    expect(result.isRight()).toBe(true)
  })

  it('should be able to have a error result', () => {
    const result = doSomething(false)

    expect(result.isLeft()).toBe(true)
  })
})

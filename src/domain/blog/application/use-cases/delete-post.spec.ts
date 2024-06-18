import { makeRegister } from 'test/factories/makeRegister'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-posts-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { DeletePostUseCase } from './delete-post'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryPostsRepository: InMemoryPostsRepository
let sut: DeletePostUseCase

describe('Delete Post', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new DeletePostUseCase(inMemoryPostsRepository)
  })

  it('should be able to delete a post create by user', async () => {
    const user = makeRegister()

    await inMemoryUsersRepository.create(user)

    const post = await inMemoryPostsRepository.create({
      title: 'Test Post Title',
      content: 'Test Post Content',
      userId: user.id,
      id: 'post-1',
    })

    await sut.execute({ postId: post.id })

    const posts = await inMemoryPostsRepository.findById(post.id)

    expect(posts).toBeNull()
  })
})

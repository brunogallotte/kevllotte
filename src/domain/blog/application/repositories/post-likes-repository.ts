import type { PostLike } from '../../enterprise/entities/post-like'

export type PostLikesRepository = {
  findByPostAndAuthorId(
    postId: string,
    authorId: string,
  ): Promise<PostLike | null>
  create(postLike: PostLike): Promise<void>
  delete(postLike: PostLike): Promise<void>
}

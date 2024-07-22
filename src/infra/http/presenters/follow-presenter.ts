import type { Follow } from '@/domain/blog/enterprise/entities/follow'

export class FollowPresenter {
  static toHTTP(follow: Follow) {
    return {
      id: follow.id.toString(),
      followerAuthorId: follow.followerAuthorId.toString(),
      followingAuthorId: follow.followingAuthorId.toString(),
      createdAt: follow.createdAt,
    }
  }
}

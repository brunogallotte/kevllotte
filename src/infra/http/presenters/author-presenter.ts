import type { Author } from '@/domain/blog/enterprise/entities/author'

export class AuthorPresenter {
  static toHTTP(author: Author) {
    return {
      id: author.id.toString(),
      name: author.name,
      email: author.email,
      bio: author.bio,
      linkedinUrl: author.linkedinUrl,
      githubUrl: author.githubUrl,
      instagramUrl: author.instagramUrl,
      twitterUrl: author.twitterUrl,
      websiteUrl: author.websiteUrl,
      avatarUrl: author.avatarUrl,
      createdAt: author.createdAt,
      updatedAt: author.updatedAt,
    }
  }
}

// Talvez criar um presenter para pegar os links do perfil do usuário

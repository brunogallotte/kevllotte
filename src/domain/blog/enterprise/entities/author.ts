import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

export type AuthorProps = {
  name: string
  email: string
  username: string
  password: string
  bio: string | null
  avatarUrl: string | null
  linkedinUrl: string | null
  githubUrl: string | null
  instagramUrl: string | null
  twitterUrl: string | null
  websiteUrl: string | null
  createdAt: Date
  updatedAt?: Date
}

export class Author extends Entity<AuthorProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get username() {
    return this.props.username
  }

  get password() {
    return this.props.password
  }

  get bio() {
    return this.props.bio ?? ''
  }

  get avatarUrl() {
    return this.props.avatarUrl ?? ''
  }

  get linkedinUrl() {
    return this.props.linkedinUrl ?? ''
  }

  get githubUrl() {
    return this.props.githubUrl ?? ''
  }

  get instagramUrl() {
    return this.props.instagramUrl ?? ''
  }

  get twitterUrl() {
    return this.props.twitterUrl ?? ''
  }

  get websiteUrl() {
    return this.props.websiteUrl ?? ''
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set name(name: string) {
    this.props.name = name

    this.touch()
  }

  set username(username: string) {
    this.props.username = username

    this.touch()
  }

  set bio(bio: string) {
    this.props.bio = bio

    this.touch()
  }

  set avatarUrl(avatarUrl: string) {
    this.props.avatarUrl = avatarUrl

    this.touch()
  }

  set linkedinUrl(linkedinUrl: string) {
    this.props.linkedinUrl = linkedinUrl

    this.touch()
  }

  set githubUrl(githubUrl: string) {
    this.props.githubUrl = githubUrl

    this.touch()
  }

  set instagramUrl(instagramUrl: string) {
    this.props.instagramUrl = instagramUrl

    this.touch()
  }

  set twitterUrl(twitterUrl: string) {
    this.props.twitterUrl = twitterUrl

    this.touch()
  }

  set websiteUrl(websiteUrl: string) {
    this.props.websiteUrl = websiteUrl

    this.touch()
  }

  static create(
    props: Optional<AuthorProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const author = new Author(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return author
  }
}

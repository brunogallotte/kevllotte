import dayjs from 'dayjs'

import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Slug } from './value-objects/slug'

export enum POST_STATUS {
  DRAFT,
  PUBLISHED,
}

export type PostProps = {
  authorId: UniqueEntityID
  title: string
  content: string
  slug: Slug
  status: POST_STATUS
  collabId?: UniqueEntityID
  createdAt: Date
  updatedAt?: Date | null
}

export class Post extends Entity<PostProps> {
  get authorId() {
    return this.props.authorId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get status() {
    return this.props.status
  }

  get collabId() {
    return this.props.collabId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set title(title: string) {
    this.props.title = title

    this.props.slug = Slug.createFromText(title)

    this.touch()
  }

  set content(content: string) {
    this.props.content = content

    this.touch()
  }

  set status(status: POST_STATUS) {
    this.props.status = status

    this.touch()
  }

  static create(
    props: Optional<PostProps, 'createdAt' | 'slug' | 'collabId'>,
    id?: UniqueEntityID,
  ) {
    const post = new Post(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        collabId: props.collabId ?? undefined,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return post
  }
}

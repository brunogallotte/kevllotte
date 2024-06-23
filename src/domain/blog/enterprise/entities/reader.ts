import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

type ReaderProps = {
  name: string
}

export class Reader extends Entity<ReaderProps> {
  static create(props: ReaderProps, id?: UniqueEntityID) {
    const reader = new Reader(props, id)

    return reader
  }
}

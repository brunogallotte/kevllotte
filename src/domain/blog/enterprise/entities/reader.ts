import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

type ReaderProps = {
  name: string
  email: string
  password: string
}

export class Reader extends Entity<ReaderProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  static create(props: ReaderProps, id?: UniqueEntityID) {
    const reader = new Reader(props, id)

    return reader
  }
}

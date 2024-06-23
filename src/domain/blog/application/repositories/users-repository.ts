import type { Prisma, User } from '@prisma/client'

export type UsersRepository = {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  delete(id: string): Promise<void>
  create(data: Prisma.UserCreateInput): Promise<User>
  update(data: User): Promise<User>
}

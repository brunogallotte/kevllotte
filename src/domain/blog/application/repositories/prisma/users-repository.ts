import type { Prisma, User } from '@prisma/client'

export type UsersRepository = {
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}

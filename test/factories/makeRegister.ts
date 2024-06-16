import { faker } from '@faker-js/faker'

type RegisterUserProps = {
  name: string
  email: string
  password: string
}

export function makeRegister(override: Partial<RegisterUserProps> = {}) {
  const user: RegisterUserProps = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 6 }),
    ...override,
  }

  return user
}

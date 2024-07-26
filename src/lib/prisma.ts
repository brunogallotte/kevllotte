import { PrismaClient } from '@prisma/client'

import { env } from '@/env'

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient
}

let prismaInstance: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prismaInstance = new PrismaClient({
    datasources: {
      db: {
        url: `${env.DATABASE_URL}?connect_timeout=20`,
      },
    },
  })
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }

  prismaInstance = global.cachedPrisma
}

export const prisma = prismaInstance

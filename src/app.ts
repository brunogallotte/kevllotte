import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'

import { env } from './env'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(appRoutes)

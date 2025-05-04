import { UnauthorizedException } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

export type Context = FastifyRequest & {
  raw: {
    user: {
      id: string
      email: string
      name: string
      surname: string
      role: 'USER' | 'ADMIN'
      tel: string | null
      line: string | null
      address: string | null
    } | null
  }
}

export const getUserFromContext = (ctx: Context) => {
  const user = ctx.raw.user
  if (!user) {
    throw new UnauthorizedException('Unauthorized')
  }

  return user
}

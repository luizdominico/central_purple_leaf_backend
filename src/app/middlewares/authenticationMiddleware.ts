import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface Payload {
  id: string
  iat: number
  exp: number
}

require('dotenv').config({
  path: '@root/.env'
})

export default function authenticationMiddleware(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers

  if (!authorization) {
    return response.status(401).json({ message: 'Unauthorized' })
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    const data = jwt.verify(token, process.env.JWTSECRET!)
    const { id } = data as Payload
    request.userUuid = id
    return next()
  } catch {
    return response.status(401).json({ message: 'Unauthorized.' })
  }
}

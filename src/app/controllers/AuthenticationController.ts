import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import md5 from 'md5'
import jwt from 'jsonwebtoken'

import User from '@src/app/entities/User'
require('dotenv').config({
  path: '@root/.env'
})

class AuthenticationController {
  async authenticate(request: Request, response: Response) {
    const userRepository = getRepository(User)
    const { username, email } = request.body
    let { password } = request.body

    password = md5(password)

    const user = await userRepository.findOne({
      where: [
        { username, password },
        { email, password }
      ]
    })

    if (!user) {
      return response.status(401).json({ message: 'Username, email or password are wrong.' })
    } else {
      const token = jwt.sign({ id: user.id }, process.env.JWTSECRET!, { expiresIn: '1d' })
      return response.status(200).json({ token })
    }
  }
}

export default new AuthenticationController()

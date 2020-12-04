import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Inventory from '@src/app/entities/Inventory'
import User from '@src/app/entities/User'

class UserController {
  async create(request: Request, response: Response) {
    const inventoryRepository = getRepository(Inventory)
    const userRepository = getRepository(User)

    const { username, email } = request.body
    const usernameAlreadyRegistered = await userRepository.findOne({ where: { username } })
    const emailAlreadyRegistered = await userRepository.findOne({ where: { email } })

    if (usernameAlreadyRegistered || emailAlreadyRegistered) {
      return response.status(409).json({ message: 'Username or email already registered.' })
    }

    const inventory = inventoryRepository.create()
    await inventoryRepository.save(inventory)

    const user = userRepository.create({ ...request.body, inventory })
    await userRepository.save(user)

    response.status(201).json(user)
  }

  async read(request: Request, response: Response) {
    return response.json({ message: 'User list.' })
  }
}

export default new UserController()

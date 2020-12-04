import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import User from '@src/app/entities/User'
import Product from '@src/app/entities/Product'

class InventoryController {
  async read(request: Request, response: Response) {
    const userRepository = getRepository(User)
    const productRepository = getRepository(Product)
    const user = await userRepository.findOne({ where: { id: request.userUuid }, relations: ['inventory'] })

    if (user) {
      const products = await productRepository.find({ where: { inventory: user.inventory } })
      return response.status(200).json(products)
    }
  }
}

export default new InventoryController()

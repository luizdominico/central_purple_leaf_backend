import { Request, Response } from 'express'
import { getRepository, Not } from 'typeorm'

import User from '@src/app/entities/User'
import Product from '@src/app/entities/Product'

class ProductController {
  async create(request: Request, response: Response) {
    const userRepository = getRepository(User)
    const productRepository = getRepository(Product)

    const user = await userRepository.findOne({ where: { id: request.userUuid }, relations: ['inventory'] })

    if (user) {
      const product = await productRepository.create({ ...request.body, inventory: user.inventory.id })
      await productRepository.save(product)
      return response.status(201).json(product)
    }
  }

  async read(request: Request, response: Response) {
    const userRepository = getRepository(User)
    const productRepository = getRepository(Product)

    const user = await userRepository.findOne({ where: { id: request.userUuid }, relations: ['inventory'] })

    if (user) {
      const products = await productRepository.find({
        where: { sell: true, inventory: { id: Not(user.inventory.id) } }
      })
      return response.status(200).json(products)
    }
  }

  async details(request: Request, response: Response) {
    const productRepository = getRepository(Product)
    const product = await productRepository.findOne({ where: { id: request.params.uuid }, relations: ['comments'] })
    return response.status(200).json(product)
  }

  async sell(request: Request, response: Response) {
    const productRepository = getRepository(Product)
    const product = await productRepository.findOne({ where: { id: request.params.uuid } })

    /* check if the user that is editing this option is the current owner of the product */

    if (product) {
      product.sell = true
      await productRepository.save(product)
      return response.status(200).json(product)
    }
  }

  async takeoff(request: Request, response: Response) {
    const productRepository = getRepository(Product)
    const product = await productRepository.findOne({ where: { id: request.params.uuid } })

    /* check if the user that is editing this option is the current owner of the product */

    if (product) {
      product.sell = false
      await productRepository.save(product)
      return response.status(200).json(product)
    }
  }

  async buy(request: Request, response: Response) {
    const userRepository = getRepository(User)
    const productRepository = getRepository(Product)

    const product = await productRepository.findOne({ where: { id: request.params.uuid } })
    const user = await userRepository.findOne({ where: { id: request.userUuid }, relations: ['inventory'] })

    if (product && user) {
      product.inventory = user.inventory
      product.sell = false
      await productRepository.save(product)
      return response.status(200).json(product)
    }
  }
}

export default new ProductController()

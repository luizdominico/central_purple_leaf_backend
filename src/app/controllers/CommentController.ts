import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Comment from '@src/app/entities/Comment'

class CommentController {
  async create(request: Request, response: Response) {
    const commentRepository = getRepository(Comment)

    const comment = await commentRepository.create({ ...request.body, product: { id: request.params.uuid } })
    await commentRepository.save(comment)
    return response.status(201).json(comment)
  }
}

export default new CommentController()

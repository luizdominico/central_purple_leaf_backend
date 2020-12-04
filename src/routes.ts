import { Router, Request, Response } from 'express'

import UserController from '@src/app/controllers/UserController'
import AuthenticationController from '@src/app/controllers/AuthenticationController'
import ProductController from '@src/app/controllers/ProductController'
import InventoryController from '@src/app/controllers/InventoryController'
import CommentController from '@src/app/controllers/CommentController'

import AuthenticationMiddleware from '@src/app/middlewares/authenticationMiddleware'

const router: Router = Router()

router.route('/login').post(AuthenticationController.authenticate)

router.route('/users').post(UserController.create).get(AuthenticationMiddleware, UserController.read)
router.route('/user/:uuid').get((request: Request, response: Response) => {
  response.send(request.params.uuid)
})

router.route('/inventory').get(AuthenticationMiddleware, InventoryController.read)

router.route('/products').get(AuthenticationMiddleware, ProductController.read)
router.route('/product').post(AuthenticationMiddleware, ProductController.create)
router.route('/product/:uuid').get(AuthenticationMiddleware, ProductController.details)
router.route('/product/:uuid/sell').get(AuthenticationMiddleware, ProductController.sell)
router.route('/product/:uuid/takeoff').get(AuthenticationMiddleware, ProductController.takeoff)
router.route('/product/:uuid/buy').get(AuthenticationMiddleware, ProductController.buy)

router.route('/comment/:uuid').post(AuthenticationMiddleware, CommentController.create)

export default router

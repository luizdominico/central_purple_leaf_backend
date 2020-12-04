import express, { Router } from 'express'
import cors from 'cors'
import routes from './routes'

class Server {
  public express: express.Application

  public constructor() {
    this.express = express()
    this.middlewares()
    this.routing(routes)
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private routing(routes: Router): void {
    this.express.use(routes)
  }

  public listen(): string {
    this.express.listen(3000)
    return 'Server is running at http://localhost:3000'
  }
}

export default new Server()

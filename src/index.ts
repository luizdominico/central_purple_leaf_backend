import 'reflect-metadata'
import server from './server'

import './database/connect'
console.log(server.listen())

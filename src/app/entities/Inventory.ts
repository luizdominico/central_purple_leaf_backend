import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm'
import User from './User'
import Product from './Product'

@Entity('tb_inventory')
class Inventory {
  @PrimaryGeneratedColumn('uuid', { name: 'inventory_id' })
  id!: string

  @OneToOne(() => User, user => user.inventory)
  user!: User

  @OneToMany(() => Product, product => product.inventory)
  products!: Product[]
}

export default Inventory

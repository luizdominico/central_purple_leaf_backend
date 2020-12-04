import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm'
import Inventory from './Inventory'
import Comment from './Comment'

@Entity('tb_product')
class Product {
  @PrimaryGeneratedColumn('uuid', { name: 'product_id' })
  id!: string

  @Column('text', { name: 'product_name' })
  name!: string

  @Column('text', { name: 'product_type' })
  type!: string

  @Column('text', { name: 'product_image' })
  image!: string

  @Column('boolean', { name: 'product_sell' })
  sell!: boolean

  @Column('float', { name: 'product_price' })
  price!: number

  @ManyToOne(() => Inventory, inventory => inventory.products)
  @JoinColumn({ name: 'product_inventory' })
  inventory!: Inventory

  @OneToMany(() => Comment, comment => comment.product)
  comments!: Comment[]
}

export default Product

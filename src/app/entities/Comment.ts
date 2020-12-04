import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Product from './Product'

@Entity('tb_comment')
class Comment {
  @PrimaryGeneratedColumn('uuid', { name: 'comment_id' })
  id!: string

  @Column('text', { name: 'comment_message' })
  message!: string

  @ManyToOne(() => Product, product => product.comments)
  @JoinColumn({ name: 'comment_product' })
  product!: Product
}

export default Comment

import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import md5 from 'md5'
import Inventory from './Inventory'

@Entity('tb_user')
class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id!: string

  @Column('text', { name: 'user_username' })
  username!: string

  @Column('text', { name: 'user_fullname' })
  fullname!: string

  @Column('text', { name: 'user_email' })
  email!: string

  @Column('text', { name: 'user_password' })
  password!: string

  @Column('text', { name: 'user_birthdate' })
  birthdate!: string

  @OneToOne(() => Inventory, inventory => inventory.user)
  @JoinColumn({ name: 'user_inventory' })
  inventory!: Inventory

  @BeforeInsert()
  @BeforeUpdate()
  encrypt() {
    this.password = md5(this.password)
  }
}

export default User

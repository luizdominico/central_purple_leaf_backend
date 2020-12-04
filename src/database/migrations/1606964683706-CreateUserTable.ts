import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUserTable1606964683706 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.createTable(
      new Table({
        name: 'tb_user',
        columns: [
          {
            name: 'user_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'user_username',
            type: 'varchar',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'user_fullname',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'user_email',
            type: 'varchar',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'user_password',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'user_birthdate',
            type: 'date',
            isNullable: false
          },
          {
            name: 'user_inventory',
            type: 'uuid',
            isNullable: false,
            isUnique: true
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_user')
    await queryRunner.query('DROP EXTENSIONS "uuid-ossp"')
  }
}

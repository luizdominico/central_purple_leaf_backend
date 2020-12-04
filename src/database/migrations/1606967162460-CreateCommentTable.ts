import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCommentTable1606967162460 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.createTable(
      new Table({
        name: 'tb_comment',
        columns: [
          {
            name: 'comment_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'comment_message',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'comment_product',
            type: 'uuid',
            isNullable: true
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_comment')
    await queryRunner.query('DROP EXTENSIONS "uuid-ossp"')
  }
}

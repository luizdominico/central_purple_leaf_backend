import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateInventoryTable1606966301279 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.createTable(
      new Table({
        name: 'tb_inventory',
        columns: [
          {
            name: 'inventory_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_inventory')
    await queryRunner.query('DROP EXTENSIONS "uuid-ossp"')
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateProductTable1606967143282 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.createTable(
      new Table({
        name: 'tb_product',
        columns: [
          {
            name: 'product_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'product_name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'product_type',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'product_image',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'product_sell',
            type: 'boolean',
            isNullable: false
          },
          {
            name: 'product_price',
            type: 'float',
            isNullable: false
          },
          {
            name: 'product_inventory',
            type: 'uuid',
            isNullable: false
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_product')
    await queryRunner.query('DROP EXTENSIONS "uuid-ossp"')
  }
}

import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class AddProductInventoryForeignKey1606968221255 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'tb_product',
      new TableForeignKey({
        columnNames: ['product_inventory'],
        referencedColumnNames: ['inventory_id'],
        referencedTableName: 'tb_inventory',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_product', 'product_inventory')
  }
}

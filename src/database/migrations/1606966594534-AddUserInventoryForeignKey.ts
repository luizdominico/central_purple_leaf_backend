import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class AddUserInventoryForeignKey1606966594534 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'tb_user',
      new TableForeignKey({
        columnNames: ['user_inventory'],
        referencedColumnNames: ['inventory_id'],
        referencedTableName: 'tb_inventory',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_user', 'user_inventory')
  }
}

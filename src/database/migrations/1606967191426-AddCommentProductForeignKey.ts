import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class AddProductCommentForeignKey1606967191426 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'tb_comment',
      new TableForeignKey({
        columnNames: ['comment_product'],
        referencedColumnNames: ['product_id'],
        referencedTableName: 'tb_product',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_comment', 'comment_product')
  }
}

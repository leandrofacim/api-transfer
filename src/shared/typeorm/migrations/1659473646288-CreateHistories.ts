import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateHistories1659473646288 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'histories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['T'],
          },
          {
            name: 'total_before',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'total_after',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'user_id_transfer',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'WalletUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'WalletUserTransfer',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id_transfer'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('histories');
  }
}

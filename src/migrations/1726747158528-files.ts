import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Files1726747158528 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'files',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'bucket',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'file_size',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'file_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true,
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('files');
    }
}
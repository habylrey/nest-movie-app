import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Series1526513029946 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'series',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: false,
                    },
                    {
                        name: 'poster_file_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'start_year',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'grad_year',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'genre_id',
                        type: 'int',
                        isNullable: true,
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
            }),
            true
        );
            await queryRunner.createForeignKey('series', new TableForeignKey({
            columnNames: ['genre_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'genres',
            onDelete: 'SET NULL',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('series');
    }
}
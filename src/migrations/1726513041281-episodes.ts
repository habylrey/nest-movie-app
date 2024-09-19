import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Episodes1726513041281 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'episodes',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'preview_file_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'series_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'season',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'episode',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'episode_link',
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
                        name: 'name',
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
            }),
            true
        );
        await queryRunner.createForeignKey(
            'episodes',
            new TableForeignKey({
                columnNames: ['series_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'series',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('episodes');
    }
}
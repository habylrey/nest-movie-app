import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Grades1626513006308 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'grades',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'grade',
                        type: 'int',
                    },
                    {
                        name: 'movie_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'series_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'user_id',
                        type: 'int',
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
            'grades',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            })
        );
        await queryRunner.createForeignKey(
            'grades',
            new TableForeignKey({
                columnNames: ['movie_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'movies',
                onDelete: 'CASCADE',
            })
        );
        await queryRunner.createForeignKey(
            'grades',
            new TableForeignKey({
                columnNames: ['series_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'series',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('grades');
    }
}
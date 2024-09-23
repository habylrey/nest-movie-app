import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Favorites1726513018515 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'favorites',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'movie_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'series_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'grade_id',
                    type: 'int',
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
        }));

        await queryRunner.createForeignKey('favorites', new TableForeignKey({
            columnNames: ['movie_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'movies',
            onDelete: 'SET NULL',
        }));

        await queryRunner.createForeignKey('favorites', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('favorites', new TableForeignKey({
            columnNames: ['series_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'series',
            onDelete: 'SET NULL',
        }));

        await queryRunner.createForeignKey('favorites', new TableForeignKey({
            columnNames: ['grade_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'grades',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('favorites');
    }
}
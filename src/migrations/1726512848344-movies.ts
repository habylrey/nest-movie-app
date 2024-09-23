import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Movies1726512848344 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'movies',
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'poster_file_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'director_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'genre_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'link',
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
        );
        await queryRunner.createForeignKey('movies', new TableForeignKey({
            columnNames: ['director_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'directors',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('movies', new TableForeignKey({
            columnNames: ['genre_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'genres',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movies');
    }
}
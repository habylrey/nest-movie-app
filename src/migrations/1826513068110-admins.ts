import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Admins1826513068110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'admins',
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
                            name: 'role',
                            type: 'varchar',
                            length: '255',
                            isNullable: false,
                        },
                        {
                            name: 'email',
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
                    ]
                }
            )
        )
    }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('admins');
    }

}

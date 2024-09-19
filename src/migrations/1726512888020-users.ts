import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1726512888020 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'users',
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
                            name: 'password',
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
                            name: 'user_pic_id',
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
                    ]
                }
            )
        )
    }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}

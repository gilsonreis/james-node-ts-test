import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createJogosTable1634485809276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        await queryRunner.createTable(new Table({
            name: 'jogo',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'nome',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'descricao',
                    type: 'text'
                },
                {
                    name: 'foto',
                    type: 'varchar'
                },
                {
                    name: 'data_lancamento',
                    type: 'date'
                },
                {
                    name: 'produtora_id',
                    type: 'uuid',
                    isNullable: false
                },
                {
                    name: 'desenvolvedora_id',
                    type: 'uuid',
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    isNullable: true
                }
            ]
        }));

        await queryRunner.createForeignKey(
            'jogo',
            new TableForeignKey({
                columnNames: ['desenvolvedora_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'desenvolvedora',
                name: 'fk_jogo_desenvolvedora',
                onDelete: 'CASCADE',
                onUpdate: 'SET NULL'
            })
        );

        await queryRunner.createForeignKey(
            'jogo',
            new TableForeignKey({
                columnNames: ['produtora_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'produtora',
                name: 'fk_jogo_produtora',
                onDelete: 'CASCADE',
                onUpdate: 'SET NULL'
            })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey(
            'jogo',
            'fk_jogo_desenvolvedora'
        );

        await queryRunner.dropForeignKey(
            'jogo',
            'fk_jogo_produtora'
        );

        await queryRunner.dropTable('jogo');
    }

}

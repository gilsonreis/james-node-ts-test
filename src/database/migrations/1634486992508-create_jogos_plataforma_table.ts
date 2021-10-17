import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createJogosPlataformaTable1634486992508 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'jogo_plataforma',
                columns: [
                    {
                        name: 'jogo_id',
                        type: 'uuid'
                    },
                    {
                        name: 'plataforma_id',
                        type: 'uuid'
                    }
                ]
            })
        )

        await queryRunner.createForeignKey(
            'jogo_plataforma',
            new TableForeignKey({
                columnNames: ['jogo_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'jogo',
                name: 'fk_jogo_plataforma_jogo',
                onDelete: 'CASCADE',
                onUpdate: 'SET NULL'
            })
        )

        await queryRunner.createForeignKey(
            'jogo_plataforma',
            new TableForeignKey({
                columnNames: ['plataforma_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'plataforma',
                name: 'fk_jogo_plataforma_plataforma',
                onDelete: 'CASCADE',
                onUpdate: 'SET NULL'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'jogo_plataforma',
            'fk_jogo_plataforma_jogo'
        )
        await queryRunner.dropForeignKey(
            'jogo_plataforma',
            'fk_jogo_plataforma_plataforma'
        )

        await queryRunner.dropTable('jogo_plataforma')
    }

}

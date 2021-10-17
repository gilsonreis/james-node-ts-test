import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createJogosCategoriaTable1634486983003 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'jogo_categoria',
                columns: [
                    {
                        name: 'jogo_id',
                        type: 'uuid'
                    },
                    {
                        name: 'categoria_id',
                        type: 'uuid'
                    }
                ]
            })
        )

        await queryRunner.createForeignKey(
            'jogo_categoria',
            new TableForeignKey({
                columnNames: ['jogo_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'jogo',
                name: 'fk_jogo_categoria_jogo',
                onDelete: 'CASCADE',
                onUpdate: 'SET NULL'
            })
        )

        await queryRunner.createForeignKey(
            'jogo_categoria',
            new TableForeignKey({
                columnNames: ['categoria_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'categoria',
                name: 'fk_jogo_categoria_categoria',
                onDelete: 'CASCADE',
                onUpdate: 'SET NULL'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'jogo_categoria',
            'fk_jogo_categoria_categoria'
        )
        await queryRunner.dropForeignKey(
            'jogo_categoria',
            'fk_jogo_categoria_jogo'
        )

        await queryRunner.dropTable('jogo_categoria')
    }

}

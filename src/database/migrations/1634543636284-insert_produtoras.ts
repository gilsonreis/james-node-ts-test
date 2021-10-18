import {MigrationInterface, QueryRunner} from "typeorm";
import { v4 as uuidv4 } from 'uuid'

export class insertProdutoras1634543636284 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const produtoras = [
            {
                nome: 'Warner Bros. Interactive Entertainment',
                descricao: 'A Warner Bros. Interactive Entertainment, também conhecida como WB Games, é uma publicadora norte-americana de jogos eletrônicos sediada em Burbank, Califórnia.'
            },
            {
                nome: 'NetherRealm Studios',
                descricao: 'NetherRealm Studios é uma desenvolvedora norte-americana de jogos eletrônicos sediada em Chicago, Illinois. '
            },
            {
                nome: 'CD Projekt S.A',
                descricao: 'A CD Projekt S.A. é uma desenvolvedora e publicadora de jogos eletrônicos polonesa sediada em Varsóvia, Mazóvia.'
            },
            {
                nome: 'Avalanche Software',
                descricao: 'Avalanche Software, LLC é uma produtora de jogos, anteriormente detida pela Disney Interactive Studios'
            },
            {
                nome: 'Sony Interactive Entertainment',
                descricao: 'A Sony Interactive Entertainment é uma desenvolvedora e publicadora multinacional de jogos eletrônicos e consoles. '
            },
        ]

        for (const produtora of produtoras) {
            const id = uuidv4()
            const sql = `insert into produtora values('${id}', '${produtora.nome}', '${produtora.descricao}', '2021-10-18 21:29:35')`
            await queryRunner.query(sql)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('truncate table produtora')
    }

}

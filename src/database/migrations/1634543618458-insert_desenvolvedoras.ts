import {MigrationInterface, QueryRunner} from "typeorm";
import { v4 as uuidv4 } from 'uuid'

export class insertDesenvolvedoras1634543618458 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const desenvolvedoras = [
            {
                nome: 'Activision Blizzard',
                descricao: 'Fruto da fusão de grandes duas desenvolvedoras, a Activision Blizzard é uma empresa americana responsável pelo jogo Call of Duty, um dos títulos com muito apelo para e-sports no mundo todo.'
            },
            {
                nome: 'Electronic Arts',
                descricao: 'A Electronic Arts é responsável pelo jogo FIFA 20, que tem milhares de jogadores apaixonados, inclusive muitos famosos que fazem competições entre si.'
            },
            {
                nome: 'Nintendo',
                descricao: 'Desenvolvedora e publicadora de jogos, a Nintendo é a responsável por outra família de consoles muito famosa e de mesmo nome.'
            },
            {
                nome: 'Microsoft',
                descricao: 'A Microsoft é a desenvolvedora do Xbox, um dos consoles mais famosos e usados pelos jogadores. Em 2019, a empresa faturou pouco mais de US$ 2,8 bilhões de dólares com suas soluções para games.'
            },
            {
                nome: 'Square Enix',
                descricao: 'A Square Enix Holdings Co., Ltd. é uma desenvolvedora e publicadora japonesa de jogos eletrônicos sediada em Tóquio.'
            },
            {
                nome: 'Capcom',
                descricao: 'Capcom Co., Ltd. é uma desenvolvedora e publicadora japonesa de jogos eletrônicos sediada em Osaka. '
            }
        ]

        for (const desenvolvedora of desenvolvedoras) {
            const id = uuidv4()
            const sql = `insert into desenvolvedora values('${id}', '${desenvolvedora.nome}', '${desenvolvedora.descricao}', '2021-10-18 21:29:35')`
            await queryRunner.query(sql)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('truncate table desenvolvedora')
    }

}

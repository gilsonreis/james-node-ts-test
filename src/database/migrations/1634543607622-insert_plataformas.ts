import {MigrationInterface, QueryRunner} from "typeorm";
import { v4 as uuidv4 } from 'uuid'

export class insertPlataformas1634543607622 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const plataformas = [
            {
                nome: 'Xbox Series S|X',
                descricao: 'A próxima geração de jogos traz nossa maior biblioteca de lançamentos digitais para o menor Xbox de todos os tempos. Com mundos mais dinâmicos, tempos de carregamento mais rápidos e a adição do Xbox Game Pass (vendido separadamente), o Xbox Series S totalmente digital é a melhor combinação de jogos.'
            },
            {
                nome: 'Xbox One S|X',
                descricao: 'Bem vindo a uma nova geração de jogos e entretenimento onde os jogos beiram a fronteira do realismo e ouvir música enquanto joga acontece de maneira instantânea, além disso, você pode mudar entre sua televisão para música ou um jogo em um instante.'
            },
            {
                nome: 'PlayStation 4',
                descricao: 'Explore vivid game worlds with rich visuals heightened by PS4 Pro. Support for faster frame rates delivers super-sharp action for select PS4 games.'
            },
            {
                nome: 'Nintendo Switch',
                descricao: 'O Nintendo Switch foi desenvolvido para fazer parte da sua vida, transformando-se de um console doméstico em um console portátil num piscar de olhos.'
            },
            {
                nome: 'Mobile',
                descricao: 'Jogos projetados para telefones celulares.'
            },
            {
                nome: 'PC',
                descricao: 'Com jogos cada vez mais avançados e realistas, um PC Gamer é o equipamento ideal para te ajudar a vencer várias batalhas, oferecendo a melhor experiência e imersão.'
            }
        ]

        for (const plataforma of plataformas) {
            const id = uuidv4()
            const sql = `insert into plataforma values('${id}', '${plataforma.nome}', '${plataforma.descricao}', '2021-10-18 21:29:35')`
            await queryRunner.query(sql)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('truncate table plataforma')
    }

}

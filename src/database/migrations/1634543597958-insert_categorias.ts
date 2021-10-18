import {MigrationInterface, QueryRunner} from "typeorm";
import { v4 as uuidv4 } from 'uuid'

export class insertCategorias1634543597958 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const categorias = [
            {
                nome: 'FPS (First Person Shooter)',
                descricao: 'Os FPS são jogos de tiro em primeira pessoa, focados na perspectiva de um protagonista e com o objetivo de eliminar inimigos com o uso de armas de fogo.'
            },
            {
                nome: 'RPG',
                descricao: 'Variados do RPG tradicional (jogo com dados e fichas de papel em que os participantes devem interpretar seus personagens), os eletrônicos estão entre os games mais populares no mundo. Neles, o jogador controla as ações de um personagem em um universo complexo e bem definido, com o objetivo de completar uma série de missões para chegar à conclusão do enredo principal.'
            },
            {
                nome: 'Ação',
                descricao: 'Como o próprio nome sugere, esse gênero tem como sua principal característica a ação. Geralmente, os jogadores se veem no meio do confronto durante a gameplay e precisam superar desafios normalmente físicos, como batalhas diretas, por exemplo.'
            },
            {
                nome: 'Ação e Aventura',
                descricao: 'Esse é um gênero "combinado", que conta com duas mecânicas difundidas. Por isso, geralmente há missões de longo prazo, ou coleta de itens e ferramentas, que, futuramente, serão utilizados em combates.'
            },
            {
                nome: 'Puzzle',
                descricao: 'Jogos puzzle exigem que os jogadores busquem soluções para resolver enigmas. A mecânica desse gênero pode ser bastante variada, e se estende desde a resolução de problemas de lógica até perguntas diversas.'
            },
            {
                nome: 'Esportes',
                descricao: 'O gênero simula esportes da vida real, como futebol, vôlei, golfe, tênis e basquete. Jogos de corrida ou de boxe também se encaixam nessa categoria. '
            }
        ]

        for (const categoria of categorias) {
            const id = uuidv4()
            const sql = `insert into categoria values('${id}', '${categoria.nome}', '${categoria.descricao}', '2021-10-18 21:29:35')`
            await queryRunner.query(sql)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('truncate table categoria')
    }

}

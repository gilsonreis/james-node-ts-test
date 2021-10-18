import {Controller, Delete, Get, Post, Put, Request, Route} from 'tsoa';
import {getCustomRepository} from "typeorm";
import JogoRepository from "../repositories/JogoRepository"
import express from "express";
import Jogo from "../entities/Jogo";
import {validarDados} from "../validators/jogo.validator";

@Route('jogos')
export class JogosController extends Controller {
    @Get('')
    public async index(@Request() request: express.Request) {
        const response = request.res;
        try {
            const jogoRepository = getCustomRepository(JogoRepository)

            const { search } = request.query

            const jogos = await jogoRepository.getAll(search)
            return response.status(200).json({
                status: 'success',
                data: {
                    jogos
                }
            })
        } catch (err) {
            return response.status(500).json({
                status: 'error',
                data: {
                    'title': err.message
                }
            })
        }
    }

    @Get("{id}")
    public async view (@Request() request: express.Request) {
        const response = request.res;
        try {
            const jogoRepository = getCustomRepository(JogoRepository)
            const { id } = request.params
            const jogo = await jogoRepository.findOne(id, {relations: ["categorias", "plataformas", "desenvolvedora", "produtora"]})

            return response.status(200).json({
                status: 'success',
                data: {
                    jogo
                }
            })
        } catch {

        }
    }

    @Post()
    public async store (@Request() request: express.Request) {
        const response = request.res;
        try {
            const {
                nome,
                descricao,
                data_lancamento,
                produtora,
                desenvolvedora,
                categorias,
                plataformas
            } = request.body

            const jogoRepository = getCustomRepository(JogoRepository)

            const jogoExiste = await jogoRepository.findOne({ where: { nome } })

            if (typeof jogoExiste !== 'undefined') {
                return response.status(409).json({
                    status: 'error',
                    data: {
                        title: 'Jogo com esse nome já existe no banco de dados.'
                    }
                })
            }

            await validarDados().validate(request.body, { abortEarly: false });

            let jogo = new Jogo()
            jogo.nome = nome
            jogo.descricao = descricao
            jogo.data_lancamento = data_lancamento
            jogo.produtora = produtora
            jogo.desenvolvedora = desenvolvedora
            jogo.categorias = categorias
            jogo.plataformas = plataformas
            jogo = await jogoRepository.save(jogo)

            return response.status(201).json({
                status: 'success',
                data: {
                    title: 'Jogo cadastrado com sucesso!',
                    jogo
                }
            })
        } catch (err) {
            return response.status(400).json({
                status: 'error',
                data: err
            })
        }
    }

    @Put("{id}")
    public async update (@Request() request: express.Request) {
        const response = request.res;
        try {
            const {
                nome,
                descricao,
                data_lancamento,
                produtora,
                desenvolvedora,
                categorias,
                plataformas
            } = request.body;

            const { id } = request.params;

            const jogoRepository = getCustomRepository(JogoRepository);
            let existeJogo = await jogoRepository.verificaExistente(nome, id);

            if (existeJogo[0].qtde > 0) {
                return response.status(409).json({
                    status: 'error',
                    data: {
                        title: 'Jogo com esse nome já existe no banco de dados.'
                    }
                });
            }

            await validarDados().validate(request.body, { abortEarly: false });

            let jogo = await jogoRepository.findOne(id);
            jogo.nome = nome
            jogo.descricao = descricao
            jogo.data_lancamento = data_lancamento
            jogo.produtora = produtora
            jogo.desenvolvedora = desenvolvedora
            jogo.categorias = categorias
            jogo.plataformas = plataformas
            jogo = await jogoRepository.save(jogo);

            return response.status(201).json({
                status: 'success',
                data: {
                    title: 'Jogo alterado com sucesso!',
                    jogo
                }
            });
        } catch (err) {
            return response.status(400).json({
                status: 'error',
                data: err
            })
        }
    }

    @Delete("{id}")
    public async destroy (@Request() request: express.Request) {
        const response = request.res;
        try {
            const { id } = request.params

            const jogoRepository = getCustomRepository(JogoRepository)
            const jogo = await jogoRepository.findOne(id)
            await jogoRepository.delete(jogo)

            return response.status(200).json({
                status: 'success',
                data: {
                    title: 'Jogo deletado com sucesso!'
                }
            })
        } catch (err) {
            return response.status(404).json({
                status: 'error',
                data: {
                    title: 'Jogo inexistente!'
                }
            })
        }
    }
}

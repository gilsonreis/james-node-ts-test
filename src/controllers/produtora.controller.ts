import {Controller, Delete, Get, Post, Put, Request, Route, Tags} from 'tsoa';
import {getCustomRepository} from "typeorm";
import ProdutoraRepository from "../repositories/ProdutoraRepository"
import express from "express";
import {validarDados} from "../validators/produtora.validator";
import Produtora from "../entities/Produtora";

@Route('produtoras')
@Tags("Produtoras")
export class ProdutoraController extends Controller {
    @Get('')
    public async index(@Request() request: express.Request) {
        const response = request.res;
        try {
            const produtoraRepository = getCustomRepository(ProdutoraRepository)

            const { search } = request.query

            const produtoras = await produtoraRepository.getAll(search)
            return response.status(200).json({
                status: 'success',
                data: {
                    produtoras
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
            const produtoraRepository = getCustomRepository(ProdutoraRepository)
            const { id } = request.params
            const produtora = await produtoraRepository.findOne(id)

            return response.status(200).json({
                status: 'success',
                data: {
                    produtora
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
                descricao
            } = request.body

            const produtoraRepository = getCustomRepository(ProdutoraRepository)

            const produtoraExiste = await produtoraRepository.findOne({ where: { nome } })

            if (typeof produtoraExiste !== 'undefined') {
                return response.status(409).json({
                    status: 'error',
                    data: {
                        title: 'Produtora com esse nome já existe no banco de dados.'
                    }
                })
            }

            await validarDados().validate(request.body, { abortEarly: false });

            let produtora = new Produtora()
            produtora.nome = nome
            produtora.descricao = descricao
            produtora = await produtoraRepository.save(produtora)

            return response.status(201).json({
                status: 'success',
                data: {
                    title: 'Produtora cadastrada com sucesso!',
                    produtora
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
                descricao
            } = request.body;

            const { id } = request.params;

            const produtoraRepository = getCustomRepository(ProdutoraRepository);
            let existeProdutora = await produtoraRepository.verificaExistente(nome, id);

            if (existeProdutora[0].qtde > 0) {
                return response.status(409).json({
                    status: 'error',
                    data: {
                        title: 'Produtora com esse nome já existe no banco de dados.'
                    }
                });
            }

            await validarDados().validate(request.body, { abortEarly: false });

            let produtora = await produtoraRepository.findOne(id);
            produtora.nome = nome;
            produtora.descricao = descricao;
            produtora = await produtoraRepository.save(produtora);

            return response.status(201).json({
                status: 'success',
                data: {
                    title: 'Produtora alterada com sucesso!',
                    produtora
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

            const produtoraRepository = getCustomRepository(ProdutoraRepository)
            const produtora = await produtoraRepository.findOne(id)
            await produtoraRepository.delete(produtora)

            return response.status(200).json({
                status: 'success',
                data: {
                    title: 'Produtora deletada com sucesso!'
                }
            })
        } catch (err) {
            return response.status(404).json({
                status: 'error',
                data: {
                    title: 'Produtora inexistente!'
                }
            })
        }
    }
}

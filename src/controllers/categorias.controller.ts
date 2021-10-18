import {Controller, Delete, Get, Post, Put, Request, Route} from 'tsoa';
import {getCustomRepository} from "typeorm";
import CategoriaRepository from "../repositories/CategoriaRepository"
import express from "express";
import Categoria from "../entities/Categoria";
import {validarDados} from "../validators/categoria.validator";

@Route('categorias')
export class CategoriasController extends Controller {
    @Get('')
    public async index(@Request() request: express.Request) {
        const response = request.res;
        try {
            const categoriaRepository = getCustomRepository(CategoriaRepository)

            const { search } = request.query

            const categorias = await categoriaRepository.getAll(search)
            return response.status(200).json({
                status: 'success',
                data: {
                    categorias
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
            const categoriaRepository = getCustomRepository(CategoriaRepository)
            const { id } = request.params
            const categoria = await categoriaRepository.findOne(id)

            return response.status(200).json({
                status: 'success',
                data: {
                    categoria
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

            const categoriaRepository = getCustomRepository(CategoriaRepository)

            const categoriaExiste = await categoriaRepository.findOne({ where: { nome } })

            if (typeof categoriaExiste !== 'undefined') {
                return response.status(409).json({
                    status: 'error',
                    data: {
                        title: 'Categoria com esse nome já existe no banco de dados.'
                    }
                })
            }

            await validarDados().validate(request.body, { abortEarly: false });

            let categoria = new Categoria()
            categoria.nome = nome
            categoria.descricao = descricao
            categoria = await categoriaRepository.save(categoria)

            return response.status(201).json({
                status: 'success',
                data: {
                    title: 'Categoria cadastrado com sucesso!',
                    categoria
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

            const categoriaRepository = getCustomRepository(CategoriaRepository);
            let existeCategoria = await categoriaRepository.verificaExistente(nome, id);

            if (existeCategoria[0].qtde > 0) {
                return response.status(409).json({
                    status: 'error',
                    data: {
                        title: 'Categoria com esse nome já existe no banco de dados.'
                    }
                });
            }

            await validarDados().validate(request.body, { abortEarly: false });

            let categoria = await categoriaRepository.findOne(id);
            categoria.nome = nome;
            categoria.descricao = descricao;
            categoria = await categoriaRepository.save(categoria);

            return response.status(201).json({
                status: 'success',
                data: {
                    title: 'Categoria alterado com sucesso!',
                    categoria
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

            const categoriaRepository = getCustomRepository(CategoriaRepository)
            const categoria = await categoriaRepository.findOne(id)
            await categoriaRepository.delete(categoria)

            return response.status(200).json({
                status: 'success',
                data: {
                    title: 'Categoria deletada com sucesso!'
                }
            })
        } catch (err) {
            return response.status(404).json({
                status: 'error',
                data: {
                    title: 'Categoria inexistente!'
                }
            })
        }
    }
}

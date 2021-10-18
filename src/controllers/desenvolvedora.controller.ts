import {Controller, Delete, Get, Post, Put, Request, Route} from 'tsoa';
import {getCustomRepository} from "typeorm";
import DesenvolvedoraRepository from "../repositories/DesenvolvedoraRepository"
import express from "express";
import {validarDados} from "../validators/desenvolvedora.validator";
import Desenvolvedora from "../entities/Desenvolvedora";

@Route('desenvolvedoras')
export class DesenvolvedoraController extends Controller {
    @Get('')
    public async index(@Request() request: express.Request) {
        const response = request.res;
        try {
            const desenvolvedoraRepository = getCustomRepository(DesenvolvedoraRepository)

            const { search } = request.query

            const desenvolvedoras = await desenvolvedoraRepository.getAll(search)
            return response.status(200).json({
                status: 'success',
                data: {
                    desenvolvedoras
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
            const desenvolvedoraRepository = getCustomRepository(DesenvolvedoraRepository)
            const { id } = request.params
            const desenvolvedora = await desenvolvedoraRepository.findOne(id)

            return response.status(200).json({
                status: 'success',
                data: {
                    desenvolvedora
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

            const desenvolvedoraRepository = getCustomRepository(DesenvolvedoraRepository)

            const desenvolvedoraExiste = await desenvolvedoraRepository.findOne({ where: { nome } })

            if (typeof desenvolvedoraExiste !== 'undefined') {
                return response.status(409).json({
                    status: 'error',
                    data: {
                        title: 'Desenvolvedora com esse nome já existe no banco de dados.'
                    }
                })
            }

            await validarDados().validate(request.body, { abortEarly: false });

            let desenvolvedora = new Desenvolvedora()
            desenvolvedora.nome = nome
            desenvolvedora.descricao = descricao
            desenvolvedora = await desenvolvedoraRepository.save(desenvolvedora)

            return response.status(201).json({
                status: 'success',
                data: {
                    title: 'Desenvolvedora cadastrada com sucesso!',
                    desenvolvedora
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

            const desenvolvedoraRepository = getCustomRepository(DesenvolvedoraRepository);
            let existeDesenvolvedora = await desenvolvedoraRepository.verificaExistente(nome, id);

            if (existeDesenvolvedora[0].qtde > 0) {
                return response.status(409).json({
                    status: 'error',
                    data: {
                        title: 'Desenvolvedora com esse nome já existe no banco de dados.'
                    }
                });
            }

            await validarDados().validate(request.body, { abortEarly: false });

            let desenvolvedora = await desenvolvedoraRepository.findOne(id);
            desenvolvedora.nome = nome;
            desenvolvedora.descricao = descricao;
            desenvolvedora = await desenvolvedoraRepository.save(desenvolvedora);

            return response.status(201).json({
                status: 'success',
                data: {
                    title: 'Desenvolvedora alterada com sucesso!',
                    desenvolvedora
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

            const desenvolvedoraRepository = getCustomRepository(DesenvolvedoraRepository)
            const desenvolvedora = await desenvolvedoraRepository.findOne(id)
            await desenvolvedoraRepository.delete(desenvolvedora)

            return response.status(200).json({
                status: 'success',
                data: {
                    title: 'Desenvolvedora deletada com sucesso!'
                }
            })
        } catch (err) {
            return response.status(404).json({
                status: 'error',
                data: {
                    title: 'Desenvolvedora inexistente!'
                }
            })
        }
    }
}

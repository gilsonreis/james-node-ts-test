import {Controller, Delete, Get, Post, Put, Request, Route, Tags} from 'tsoa';
import {getCustomRepository} from "typeorm";
import PlataformaRepository from "../repositories/PlataformaRepository"
import express from "express";
import {validarDados} from "../validators/plataforma.validator";
import Plataforma from "../entities/Plataforma";

@Route('plataformas')
@Tags("Plataformas")
export class PlataformaController extends Controller {
    @Get('')
    public async index(@Request() request: express.Request) {
        const response = request.res;
        try {
            const plataformaRepository = getCustomRepository(PlataformaRepository)

            const { search } = request.query

            const plataformas = await plataformaRepository.getAll(search)
            return response.status(200).json({
                status: 'success',
                data: {
                    plataformas
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
            const plataformaRepository = getCustomRepository(PlataformaRepository)
            const { id } = request.params
            const plataforma = await plataformaRepository.findOne(id)

            return response.status(200).json({
                status: 'success',
                data: {
                    plataforma
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

            const plataformaRepository = getCustomRepository(PlataformaRepository)

            const plataformaExiste = await plataformaRepository.findOne({ where: { nome } })

            if (typeof plataformaExiste !== 'undefined') {
                return response.status(409).json({
                    status: 'error',
                    data: {
                        title: 'Plataforma com esse nome já existe no banco de dados.'
                    }
                })
            }

            await validarDados().validate(request.body, { abortEarly: false });

            let plataforma = new Plataforma()
            plataforma.nome = nome
            plataforma.descricao = descricao
            plataforma = await plataformaRepository.save(plataforma)

            return response.status(201).json({
                status: 'success',
                data: {
                    title: 'Plataforma cadastrada com sucesso!',
                    plataforma
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

            const plataformaRepository = getCustomRepository(PlataformaRepository);
            let existePlataforma = await plataformaRepository.verificaExistente(nome, id);

            if (existePlataforma[0].qtde > 0) {
                return response.status(409).json({
                    status: 'error',
                    data: {
                        title: 'Plataforma com esse nome já existe no banco de dados.'
                    }
                });
            }

            await validarDados().validate(request.body, { abortEarly: false });

            let plataforma = await plataformaRepository.findOne(id);
            plataforma.nome = nome;
            plataforma.descricao = descricao;
            plataforma = await plataformaRepository.save(plataforma);

            return response.status(201).json({
                status: 'success',
                data: {
                    title: 'Plataforma alterada com sucesso!',
                    plataforma
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

            const plataformaRepository = getCustomRepository(PlataformaRepository)
            const plataforma = await plataformaRepository.findOne(id)
            await plataformaRepository.delete(plataforma)

            return response.status(200).json({
                status: 'success',
                data: {
                    title: 'Plataforma deletada com sucesso!'
                }
            })
        } catch (err) {
            return response.status(404).json({
                status: 'error',
                data: {
                    title: 'Plataforma inexistente!'
                }
            })
        }
    }
}

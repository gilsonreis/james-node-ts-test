import {Request} from 'express'
import * as Yup from 'yup'

export const validarDados = () => {
    return Yup.object().shape({
        nome: Yup.string().required().trim(),
        descricao: Yup.string().required().trim()
    });
}

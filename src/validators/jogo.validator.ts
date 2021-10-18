import Yup from "../config/yup.config";

export const validarDados = () => {
    return Yup.object().shape({
        nome: Yup.string().required().trim(),
        descricao: Yup.string().required().trim(),
        desenvolvedora: Yup.string().required().uuid().trim(),
        produtora: Yup.string().required().uuid().trim(),
        categorias: Yup.array().min(1),
        plataformas: Yup.array().min(1),
        data_lancamento: Yup.date()
    });
}


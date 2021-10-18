import Yup from "../config/yup.config";


export const validarDados = () => {
    return Yup.object().shape({
        nome: Yup.string().required().trim(),
        descricao: Yup.string().required().trim()
    });
}

import { EntityRepository, Repository } from 'typeorm'
import Jogo from "../entities/Jogo";
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination'

@EntityRepository(Jogo)
export default class JogoRepository extends Repository<Jogo> {
    public getAll(search?): Promise<PaginationAwareObject> {
        const query = this.createQueryBuilder('j')
            .innerJoinAndSelect("j.categorias", "categoria")
            .innerJoinAndSelect("j.plataformas", "plataforma")

        if (typeof search !== 'undefined') {
            if (search.nome) {
                query.orWhere('j.nome like :nome', { nome: `%${search.nome}%` });
            }

            if (search.descricao) {
                query.orWhere('j.descricao like :descricao', { descricao: `%${search.descricao}%` });
            }

            if (search.categoria) {
                query.orWhere("categoria.id = :param_categoria", {param_categoria: `${search.categoria}` });
            }

            if (search.plataforma) {
                query.orWhere("plataforma.id = :param_plataforma", {param_plataforma: `${search.plataforma}` });
            }

            if (search.produtora) {
                query.orWhere("j.produtora_id = :param_produtora", {param_produtora: `${search.produtora}` });
            }

            if (search.desenvolvedora) {
                query.orWhere("j.desenvolvedora_id = :param_desenvolvedora", {param_desenvolvedora: `${search.desenvolvedora}` });
            }

        }

        return query.paginate();
    }

    public async verificaExistente(nome: string, id: string) {
        const sql = "select count(id) as qtde from jogo where nome = $1 and id != $2";

        return await this.query(sql, [nome, id]);
    }
}

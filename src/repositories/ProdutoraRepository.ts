import { EntityRepository, Repository } from 'typeorm'
import Produtora from "../entities/Produtora";
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination'

@EntityRepository(Produtora)
export default class ProdutoraRepository extends Repository<Produtora> {
    public getAll(search?): Promise<PaginationAwareObject> {
        const query = this.createQueryBuilder('p');

        if (typeof search !== 'undefined') {
            if (search.nome) {
                query.andWhere('p.nome like :nome', { nome: `%${search.nome}%` });
            }

            if (search.descricao) {
                query.andWhere('p.descricao like :descricao', { descricao: `%${search.descricao}%` });
            }
        }

        return query.paginate();
    }

    public async verificaExistente(nome: string, id: string) {
        const sql = "select count(id) as qtde from produtora where nome = $1 and id != $2";

        return await this.query(sql, [nome, id]);
    }
}

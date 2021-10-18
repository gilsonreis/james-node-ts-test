import { EntityRepository, Repository } from 'typeorm'
import Categoria from "../entities/Categoria";
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination'

@EntityRepository(Categoria)
export default class CategoriaRepository extends Repository<Categoria> {
    public getAll(search?): Promise<PaginationAwareObject> {
        const query = this.createQueryBuilder('c');

        if (typeof search !== 'undefined') {
            if (search.nome) {
                query.andWhere('c.nome like :nome', { nome: `%${search.nome}%` });
            }

            if (search.descricao) {
                query.andWhere('c.descricao like :descricao', { descricao: `%${search.descricao}%` });
            }
        }

        return query.paginate();
    }

    public async verificaExistente(nome: string, id: string) {
        const sql = "select count(id) as qtde from categoria where nome = $1 and id != $2";

        return await this.query(sql, [nome, id]);
    }
}

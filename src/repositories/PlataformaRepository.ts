import { EntityRepository, Repository } from 'typeorm'
import Plataforma from "../entities/Plataforma";
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination'

@EntityRepository(Plataforma)
export default class PlataformaRepository extends Repository<Plataforma> {
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
        const sql = "select count(id) as qtde from plataforma where nome = $1 and id != $2";

        return await this.query(sql, [nome, id]);
    }
}

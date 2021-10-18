import { EntityRepository, Repository } from 'typeorm'
import Desenvolvedora from "../entities/Desenvolvedora";
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination'

@EntityRepository(Desenvolvedora)
export default class DesenvolvedoraRepository extends Repository<Desenvolvedora> {
    public getAll(search?): Promise<PaginationAwareObject> {
        const query = this.createQueryBuilder('d');

        if (typeof search !== 'undefined') {
            if (search.nome) {
                query.andWhere('d.nome like :nome', { nome: `%${search.nome}%` });
            }

            if (search.descricao) {
                query.andWhere('d.descricao like :descricao', { descricao: `%${search.descricao}%` });
            }
        }

        return query.paginate();
    }

    public async verificaExistente(nome: string, id: string) {
        const sql = "select count(id) as qtde from desenvolvedora where nome = $1 and id != $2";

        return await this.query(sql, [nome, id]);
    }
}

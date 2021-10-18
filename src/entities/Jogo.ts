import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import Produtora from "./Produtora";
import Desenvolvedora from "./Desenvolvedora";
import Categoria from "./Categoria";
import Plataforma from "./Plataforma";

@Entity()
export default class Jogo {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public nome: string;

    @Column()
    public descricao: string;

    @Column()
    public data_lancamento: Date;

    @ManyToOne(type => Produtora, jogos => Jogo)
    @JoinColumn({ name: "produtora_id" })
    public produtora: Produtora;

    @ManyToOne(type => Desenvolvedora, jogos => Jogo)
    @JoinColumn({ name: "desenvolvedora_id" })
    public desenvolvedora: Desenvolvedora;

    @ManyToMany(type => Categoria)
    @JoinTable({
        name: "jogo_categoria",
        joinColumn:  {
            name: "jogo_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "categoria_id",
            referencedColumnName: "id"
        }
    })
    public categorias: Categoria[];

    @ManyToMany(type => Plataforma)
    @JoinTable({
        name: "jogo_plataforma",
        joinColumn:  {
            name: "jogo_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "plataforma_id",
            referencedColumnName: "id"
        }
    })
    public plataformas: Plataforma[]

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

    @BeforeInsert()
    public createdAt () {
        this.created_at = new Date()
    }

    @BeforeUpdate()
    public updatedAt () {
        this.updated_at = new Date()
    }
}

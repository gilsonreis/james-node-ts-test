import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity, JoinTable, ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import Jogo from "./Jogo";

@Entity("categoria")
export default class Categoria {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public nome: string;

    @Column()
    public descricao: string;

    @ManyToMany(type => Jogo, jogos => jogos.categorias)
    @JoinTable({
        name: "jogos_plataforma",
        joinColumn:  {
            name: "jogo_id"
        }
    })
    public jogos: Jogo[]

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

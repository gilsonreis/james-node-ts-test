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

@Entity()
export default class Plataforma {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public nome: string;

    @Column()
    public descricao: string;

    @ManyToMany(type => Jogo, jogos => jogos.plataformas)
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

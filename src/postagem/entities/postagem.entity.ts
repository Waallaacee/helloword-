import { IsNotEmpty, MaxLength } from "class-validator";
import { Tema } from "src/tema/entities/tema.entity";
import { Usuarios } from "src/usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity ({name:"tb_postagens"})
export class Postagem{
    
    @PrimaryGeneratedColumn()
    id: number
   
    @IsNotEmpty()
    @MaxLength(100)
    @Column({length: 100, nullable:false})
    titulo: string

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string

    @IsNotEmpty()
    @UpdateDateColumn()
    data: Date

    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })

        tema: Tema

        @ManyToOne (() => Usuarios, (usuarios) => usuarios.postagem, {
            onDelete: "CASCADE"
        })
        usuarios: Usuarios
    }


import { Delete, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuarios } from "src/usuario/entities/usuario.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";

@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            relations: {
                tema: true,
                usuarios: true
            }
        });
    }
    async findById(id: number): Promise<Postagem> {
        let postagem = await this.postagemRepository.findOne({

            where: {
                id
            },
            relations: {
                tema: true,
                usuarios: true
                
            }
        })
        if (!postagem)
            throw new HttpException('Postagem não existe', HttpStatus.NOT_FOUND)

        return postagem
    }
    async findByTitulo(Titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({

            where: {
                titulo: ILike(`%${Titulo}%`)
            },
            relations: {
                tema: true,
                usuarios: true
            }
        })

    }
    async create(Postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(Postagem)
    }

    async update(postagem: Postagem): Promise<Postagem> {

        let buscarPostagem = await this.findById(postagem.id)

        if (!buscarPostagem || !postagem.id)
            throw new HttpException('Postagem não existe', HttpStatus.NOT_FOUND)

        return await this.postagemRepository.save(postagem)

    }

    async Delete(id: number): Promise<DeleteResult> {

        let buscarPostagem = await this.findById(id)

        if (!buscarPostagem)
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND)

        return await this.postagemRepository.delete(id)

    }
}
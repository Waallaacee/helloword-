import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../service/postagem.service";

@Controller("/postagens")
export class PostagemController{
    constructor(private readonly PostagemService: PostagemService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]> {
        return this.PostagemService.findAll();
    }
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id',ParseIntPipe) id: number): Promise <Postagem> {
        return this.PostagemService.findById(id)

    }
    @Get('/titulo/:titulo')
    @HttpCode (HttpStatus.OK)
    findByTitulo(@Param('Titulo') titulo: string): Promise <Postagem[]>{
        return this.PostagemService.findByTitulo(titulo)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() postagem: Postagem): Promise <Postagem>{
        return this.PostagemService.create(postagem)

    } 
    @Put()
    @HttpCode(HttpStatus.OK)
    update (@Body()postagem:Postagem): Promise <Postagem>{

        return this.PostagemService.update(postagem)
    }


    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    Delete(@Param('id', ParseIntPipe) id:number){
    return this.PostagemService.Delete(id)
}}

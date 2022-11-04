import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { Tema } from "../entities/tema.entity";
import { TemaServiced } from "../service/tema.service";

@UseGuards(JwtAuthGuard) //foi usado aqui em cima pq todos os metodos ali em baixo precisam ser logados pra mexer.
@Controller("/tema")
export class TemaController {
constructor(private readonly TemaService: TemaServiced){}

    @Get()
    @HttpCode(HttpStatus.OK)
    finAll(): Promise<Tema[]> {
        return this.TemaService.findAll();
    }
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id',ParseIntPipe) id: number): Promise <Tema> {
        return this.TemaService.findById(id)

    }
    @Get('/descricao/:descricao')
    @HttpCode (HttpStatus.OK)
    findByDecricao(@Param('descricao') descricao: string): Promise <Tema[]>{
        return this.TemaService.findByDescricao(descricao)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() Tema: Tema): Promise <Tema>{
        return this.TemaService.create(Tema)

    } 
    @Put()
    @HttpCode(HttpStatus.OK)
    update (@Body()Tema:Tema): Promise <Tema>{

        return this.TemaService.update(Tema)
    }


    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    Delete(@Param('id', ParseIntPipe) id:number){
    return this.TemaService.Delete(id)
}
}
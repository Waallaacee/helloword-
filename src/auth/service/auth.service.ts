import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "src/usuario/service/usuario.service";
import { Bcrypt } from "../bcrypt/bcrypt";

@Injectable()
export class AuthService{
    constructor(
        private usuarioService: UsuarioService, 
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    )
    {}

    async validarUsuario(username: string, password: string): Promise <any> {              //any aceita qualquer coisa.
const buscarUsuario = await this.usuarioService.findByUsuario(username)

if(!buscarUsuario)
throw new HttpException ('Usuario não encontrado!', HttpStatus.NOT_FOUND)

const match = await this.bcrypt.compararSenha(buscarUsuario.senha, password)               //match é só de comparação. password aqui ainda nao existe.

if(buscarUsuario && match){
    const {senha,...result} = buscarUsuario   //desestruturação do objeto. peguei a senha e joguei o resto fora.
    return result;
}
return null; //sem retorno pro usuario, caso a comparação de senha funcione.
}
async login(usuarioLogin: any) {
    const payload = {username: usuarioLogin.usuario, sub: "db_blogpessoal"}

    return {
        usuario: usuarioLogin.usuario,
        token: `Bearer${this.jwtService.sign(payload)}` //transfomando a hash em token.
    }
}
}
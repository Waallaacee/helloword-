import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm'

describe('Teste de Modulos Usuario e Auth (e2e)', () => {
  
  let token: any 
  let usuarioId: any
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password:'root',
        database: 'db_blogpessoal_test',
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
        dropSchema: true
      }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close()
  })

  it('01 - Deve Cadastrar Usuario', async() => {
    const resposta = await request(app.getHttpServer())
    .post('usuarios/cadastrar')
    .send({
      nome: 'nicolle',
      usuario: 'nicolle@root.com',
      senha: 'larajasebananas',
      foto: ''
    })
.expect(201)

usuarioId= resposta.body.id
  })
  
  it('02 - Deve Autentificar Usuario(Login)', async () => {
    const resposta = await request (app.getHttpServer())
    .post('/auth/logar')
    .send({
      usuario: 'nicolle@root.com',
      senha: 'larajasebananas',
    })
    .expect (200)

    token = resposta.body.token

  })

  it('03 - Não Deve Duplicar o Usuario', async() => { //não vai puxar nada em especifico, por isso retunr.
    return request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome: 'nicolle',
      usuario: 'nicolle@root.com',
      senha: 'laranjasebananas',
      foto: ''

    })
    .expect(400)
  })

  it('04 - Deve Listar Todos os Usuarios', async() =>{
    return request (app.getHttpServer())
    .get('/usuarios/all')
    .set('authorization', `${token}`)
    .send({})
    .expect(200)
  })
  it('05 - Deve Atualizar um Usuario',async () =>{
    return request(app.getHttpServer())
    .put('/usuarios/atualizar')
    .set('Authorization', `${token}`)
    .send({
      id: usuarioId,
      nome: 'Jorginho',
      usuario: 'jorginho@gmail.com',
      senha: 'bananaselaranjas',
      foto: ''
    })
    .expect(200)
    .then( resposta => {
      expect("Root Atualizado").toEqual(resposta.body.nome)
    })
  })

  });

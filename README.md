# API Transfer

Essa API tem como objetivo realizar transações de saldo entre contas usuários

## Stack utilizada

**Back-end:** Node, Express, Typeorm, Postgres, Swagger, Jest

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/leandrofacim/api-transfer.git
```

Entre no diretório do projeto

```bash
  cd api-transfer
```

```bash
  Crie um arquivo `.env` a partir do `.env.example`. 
```

Inicie o servidor

```bash
  docker-compose up
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`APP_SECRET`
`APP_API_URL`

`DATABASE_TYPE`
`DATABASE_HOST`
`DATABASE_PORT`
`DATABASE_NAME`
`DATABASE_USERNAME`
`DATABASE_PASSWORD`

## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm jest
  ou
  yarn jest
```

## Autores

- [@leandrofacim](https://github.com/leandrofacim)

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

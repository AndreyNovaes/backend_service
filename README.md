
# API Node.js TypeScript

Esta aplicação é uma API desenvolvida em Node.js e TypeScript, projetada para fornecer dados extraídos por um web scraper. Ela serve como backend para uma aplicação frontend em React Vite. A API conta com 3 rotas GET e é consumida por um aplicativo web.

## Dependências

### As dependências do projeto estão listadas no package.json e incluem

- express
- dotenv
- cors
- pg

### Além das dependências de desenvolvimento

- typescript
- ts-node
- eslint
- jest
- ts-jest

## Como Rodar localmente

### Clone o repositório

``` bash
git clone  https://github.com/AndreyNovaes/backend_service.git
cd  backend_service
```

### Variáveis de ambiente - Para configurar a aplicação, você precisará definir as seguintes variáveis de ambiente

- DATABASE_URL: URL de conexão para o banco de dados PostgreSQL
- PORT: Porta em que a aplicação será executada (por exemplo, 3001)

_Você pode criar um arquivo .env na raiz do projeto para definir essas variáveis de ambiente ou utilizar o arquivo .env.example como base para criar o seu com o seguinte comando:_

```bash
cp .env.example  .env
```

### Instale as dependências - Para instalar as dependências, execute o seguinte comando

```bash
npm install
```

### Compile os arquivos TypeScript - Para compilar os arquivos TypeScript, execute o seguinte comando

```bash
npm run  build
```

### Inicie o servidor - Para iniciar o servidor execute o seguinte comando

```bash
npm start
```

## Testes

### Esta aplicação inclui um teste de carga usando o Apache Benchmark. Para executar o teste, utilize o seguinte comando

```bash
npm test
```

- O teste de carga está localizado na pasta report_load_test. O resultado do teste será gerado no arquivo report_load_test/report.html e aberto no navegador padrão.

- _Nota: Este teste não é um teste automatizado comum, mas sim um teste de carga para avaliar a performance da aplicação._

## Rotas da API

As rotas disponíveis são:

1. `GET /categories`: Retorna uma lista de categorias únicas disponíveis nos dados extraídos pelo web scraper. Essa rota pode ser útil para filtrar produtos por categoria no aplicativo frontend.

2. `GET /websites`: Retorna uma lista de websites únicos disponíveis nos dados extraídos pelo web scraper. Essa rota pode ser útil para filtrar produtos por website no aplicativo frontend.

3. `GET /search`: Realiza uma busca nos produtos extraídos pelo web scraper. Aceita os seguintes parâmetros de consulta opcionais:

    - `website`: Filtra os produtos por website.
    - `category`: Filtra os produtos por categoria.
    - `search`: Filtra os produtos por descrição, com base no termo de pesquisa fornecido.
    - `page`: Define o número da página para paginação (valor padrão: 1).
    - `limit`: Define o limite de produtos por página para paginação (valor padrão: 24).

    A rota retorna um objeto contendo a lista de produtos que correspondem aos critérios de busca, juntamente com o número total de produtos encontrados.

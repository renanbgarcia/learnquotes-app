# LearnQuotes

Esse é um projeto que eu fiz para começar a aprender Angular e typescript, além de fundamentos de Back-End com
Node.js e express.js, criando uma REST API que serve o back-end do aplicativo.

Rodando no Google App Engine:
https://treno-218217.appspot.com/

Eu comecei tentando fazer um web aplicativo que gera citações aleatórias, agora estou tentando
expandir as funcionalidades para fazer um aplicativo de aprendizagem de idiomas usando a geração de
citaçõe sem diversas línguas.

Atualmente já foi criado:

1. Login utilizando a estratégia Google OAuth do Passport.js.
2. Geração de citações aleatórias em Inglês e Francês.
3. Algumas Rotas da API.
4. Capacidade de salvar citações na conta do usuário.
5. Capacidade de salvar palavras das citações na conta do usuário, podendo adicionar significado e nível de conhecimento da palavra.
6. Ouvir o audio da citação.
7. Tradução da citação e sujestão de tradução de palavras.

TODO:

1. Construir perfil do usuário.
2. ...
3. Adicionar métodos de estudo/revisão de citações/palavras aprendidas.
4. Consertar toda a parte de typescript :<
5. etc etc etc

Eu usei a API do MediaWiki para obter dados do WikiQuotes.
Os dados retornados da API, assim como é referenciado na documentação dela, não
são semânticos, ou seja, foi bem complicado conseguir obter os dados necessário corretamente
para poder chegar à uma citação formatada. Mas eu consegui chegar a um resultado razoável
com os dados vindos da API em inglês e francês. Ainda é possível conseguir o mesmo com outras
línguas.

## Como rodar

- Baixe ou clone o repositório.

- Você vai precisar ter o NPM, gerenciador de pacotes do Node.js instalado.

- Instale o angularCLI com `npm install @angular/cli`

- Instale as dependências do projeto com `npm install`

- O servidor serve os arquivos criados a partir da build do Angular, então no terminal
execute: `ng build`

- E rode a aplicação com `node server.js`

Para acessar abra no navegador o endereço: `localhost:3000`

# LearnQuotes

Esse é um projeto que eu fiz para começar a aprender Angular e typescript.
É um web aplicativo que gera citações aleatórias. Eu deixei disponível
duas opções de linguas para as citações, inglês e francês.

Eu usei a API do MediaWiki para obter dados do WikiQuotes.
Os dados retornados da API, assim como é referenciado na documentação dela, não
são semânticos. Ou seja, foi bem complicado conseguir obter os dados necessário corretamente
para poder chegar à uma citação formatada. Mas eu consegui chegar a um resultado razoável
com os dados vindos da API em inglês e francês. Ainda é possível conseguir o mesmo com outras
línguas.

## Como rodar

Para ver o app em funcionamento baixe ou clone o repositório.

Você vai precisar ter o NPM, gerenciador de pacotes do Node.js instalado.

Instale o angularCLI com `npm install @angular/cli`

Instale as dependências do projecto com `npm install`

E rode a aplicação com `ng serve` ou `npm start`

Por padrão a aplicação estará rodando na porta 4200. Para acessar abra no navegador o endereço:

`localhost:4200`
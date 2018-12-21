# LearnQuotes

Esse � um projeto que eu fiz para come�ar a aprender Angular e typescript, al�m de fundamentos de Back-End com
Node.js e express.js, criando uma REST API que serve o back-end do aplicativo.

***Agora o backend é uma API Restful separada. Anteriormente era a API que servia o front.


Eu comecei tentando fazer um web aplicativo que gera cita��es aleat�rias, agora estou tentando
expandir as funcionalidades para fazer um aplicativo de aprendizagem de idiomas usando a gera��o de
cita��e sem diversas l�nguas.


Eu usei a API do MediaWiki para obter dados do WikiQuotes.
Os dados retornados da API, assim como � referenciado na documenta��o dela, n�o
s�o sem�nticos, ou seja, foi bem complicado conseguir obter os dados necess�rio corretamente
para poder chegar � uma cita��o formatada. Mas eu consegui chegar a um resultado razo�vel
com os dados vindos da API em ingl�s e franc�s. Ainda � poss�vel conseguir o mesmo com outras
l�nguas.

## Como rodar

- Baixe ou clone o reposit�rio.

- Voc� vai precisar ter o NPM, gerenciador de pacotes do Node.js instalado.

- Instale o angularCLI com `npm install @angular/cli`

- Instale as depend�ncias do projeto com `npm install`

- Execute: `ng serve` ( a API LingoAPI deverá estar rodando também ).
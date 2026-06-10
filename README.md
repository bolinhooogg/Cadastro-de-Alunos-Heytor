O sistema a Seguir foi feito com base nos requisitos do trabalho proposto;

E com base nisso Temos Funcionalidades especificas que devem ser usadas na Aplicação

são elas:

- Cadastro de Alunos;
- Listagem de Alunos cadastrados,
- Edição de informações de alunos
- Exclusão de registros 
- Integração entre front e backend


###Tecnologias utilizadas###
- Front-end
- HTML
- CSS
- JavaScript
- Back-end
- Node.js
- Express
- Banco de dados
- SQLite




###Como o sistema funciona###

O usuário acessa a interface web e realiza operações de cadastro de alunos.

As informações são enviadas para uma API desenvolvida em Node.js, que processa os dados e salva as informações em um banco SQLite.

O mesmo back-end pode ser utilizado por uma aplicação mobile.

Funcionalidades
Cadastro de alunos
Edição de alunos
Exclusão de alunos
Listagem de alunos
Armazenamento dos dados em banco de dados
Estrutura do projeto

backend/

server.js
package.json
database.db

frontend/

index.html
style.css
script.js


###Executando o projeto na sua maquina meu mano heytor###

Backend

Entrar na pasta backend:

cd backend

Instalar as dependências:

npm install

Executar o servidor:

node server.js

O servidor será iniciado em:

http://localhost:3000

Frontend

Entrar na pasta frontend:

cd frontend

Executar:

python3 -m http.server 8080

Abrir no navegador:

http://localhost:8080

Endpoints da API

GET /alunos

Retorna todos os alunos cadastrados.

POST /alunos

Cadastra um novo aluno.

PUT /alunos/

Atualiza os dados de um aluno.

DELETE /alunos/

Remove um aluno do sistema.

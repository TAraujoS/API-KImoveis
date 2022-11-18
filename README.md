<h1>API-KImóveis</h3>

Este projeto é uma API CRUD (create, read, update e delete) de imóveis, realizada como entrega no Módulo de Back-End na Kenzie. Esta API foi desenvolvida com Node.js, Express, TypeScript, TypeORM e PostgreSQL.

<h3>Rotas e funcionalidades:</h3>

| **Método** 	| **Endpoint**                       	| **Funcionalidade**                                        	|
|------------	|------------------------------------	|-----------------------------------------------------------	|
| POST       	| /users                             	| Cria um usuário                                           	|
| GET        	| /users                             	| Lista todos os usuários                                   	|
| DELETE     	| /users/:userId                     	| Realiza um soft delete de um usuário                      	|
| POST       	| /login                             	| Realiza o login do usuário e gera o token de autenticação 	|
| POST       	| /categories                        	| Cria uma categoria                                        	|
| GET        	| /categories/:categoryId/properties 	| Lista todos os imóveis pertencentes a uma categoria       	|
| POST       	| /properties                        	| Cria um imóvel                                            	|
| GET        	| /properties                        	| Lista todos os imóveis                                    	|
| POST       	| /schedules                         	| Agenda uma visita a um imóvel                             	|
| GET        	| /schedules/properties/:propertyId  	| Lista todos os agendamentos de um imóvel                  	|

<h3>Principais tecnologias utilizadas:</h3>
<ul>
  <li>Node.js</li>
  <li>Express</li>
  <li>TypeScript</li>
  <li>TypeORM</li>
  <li>PostgreSQL</li>
</ul>

<h4>Diagrama Entidade-Relacionamento</h4>

![image](https://conteudo-kenzie-fullstack.vercel.app/modulo_4/sprint_6/6_entrega/DER-Entrega5.png)


LinkedIn: https://www.linkedin.com/in/thiago-araujo-scherer/

Email: tharaujo.james@gmail.com

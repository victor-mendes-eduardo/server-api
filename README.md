Server API
============================================================

API REST para gerenciar um catálogo de servidores de aplicação assim como as aplicações hospedadas nestes.

<h2>Tecnologias utilizadas</h2>
<ul>
	<li>Javascript / NodeJS</li>
	<li>ExpressJS</li>
	<li>MongoDB (Mongolab)</li>
	<li>Swagger</li>
	<li>Amazon Web Service (EC2, Elastic Beanstalk)</li>
</ul>

<h2>Documentação</h2>

A documentação com API explorer encontra-se na URL abaixo:
http://server-api-v1.elasticbeanstalk.com/docs/

<h2>API de Gerenciamento de Servidores</h2>

<h3>Criando um Servidor de Aplicação</h3>

curl --verbose -d "{\"name\": \"Minha Aplicação\", \"status\": \"RUNNING\", \"ipAddress\": \"192.168.50.2\"}" -H "Content-Type: application/json" http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/appServers

<h3>Obter um servidor</h3>

curl --verbose http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/appServers/{id_do_servidor}

<h3>Remover um servidor</h3>

curl --verbose -X DELETE http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/appServers/{id_do_servidor}

<h3>Atualizando um servidor</h3>

curl --verbose -d "{\"name\": \"Minha Aplicação\", \"status\": \"RUNNING\", \"ipAddress\": \"192.168.50.2\"}" -H "Content-Type: application/json" -X PUT http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/appServers/{id_do_servidor}

<h3>Listando Servidores</h3> 

curl --verbose http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/appServers

<h3>Filtros</h3>

curl --verbose http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/appServers?name={nome_do_servidor}

curl --verbose http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/appServers?ipAddress={endereco_do_servidor}

curl --verbose http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/appServers?status={status_do_servidor}

curl --verbose http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/appServers?tag={tag_do_servidor}

<h3>Adicionando uma aplicação nova a um servidor </h3>

curl --verbose -d "{\"name\": \"Aplicação\", \"url\": \"http://www.minhaaplicacao.com.br\"}" -H "Content-Type: application/json" http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/appServers/{id_do_servidor}/applications

<h3>Removendo uma aplicação de um Servidor</h3> 

curl --verbose -X DELETE http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/appServers/{id_do_servidor}/applications/{id_da_aplicacao}


<h2>API de Gerenciamento de Aplicações</h2>

<h3>Criando uma Aplicação</h3>

curl --verbose -d "{\"name\": \"Aplicação\", \"url\": \"http://www.minhaaplicacao.com.br\"}" -H "Content-Type: application/json" http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/applications

<h3>Obter uma Aplicação</h3>

curl --verbose http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/applications/{id_da_aplicacao}

<h3>Remover uma Aplicação</h3>

curl --verbose -X DELETE http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/applications/{id_da_aplicacao}

<h3>Atualizando uma Aplicação</h3>

curl --verbose -d "{\"name\": \"Aplicação\", \"url\": \"http://www.minhaaplicacao.com.br\"}" -H "Content-Type: application/json" -X PUT http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/applications/{id_da_aplicacao}

<h3>Listando Aplicações</h3> 

curl --verbose http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/applications

<h3>Filtros</h3>

curl --verbose http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/applications?name={nome_da_aplicacao}

curl --verbose http://victor.mendes:123456@server-api-v1.elasticbeanstalk.com/v1/applications?url={url_da_aplicacao}

<h2>Testes de desempenho</h2>
Foram realizados testes de desempenho de leitura utilizando o Apache JMeter. 50 Threads fizeram concorrentemente 10 requisições.<br/>

<img src="https://imagizer.imageshack.us/v2/1042x655q90/633/DibB4V.png"/>
<img src="https://imagizer.imageshack.us/v2/616x387q90/743/7lKeOA.png"/>

<h2>Testes de integração</h2>
Para rodar os testes é necessário apenas rodar o comando 'npm test' dentro do diretório do projeto.<br/>

<h2>Instalando aplicação</h2>
<ul>
	<li>instalar o nodejs http://nodejs.org/download/</li>
	<li>git clone https://github.com/victor-mendes-eduardo/server-api.git</li>
	<li>cd server-api</li>
	<li>npm install</li>
	<li>node app.js</li>
</ul>

<h2>TODO</h2>
<ul>
	<li>Selecionar campos a serem exibidos nos serviços</li>
	<li>Full text search</li>
	<li>Usar mongodb na mesma região para reduzir latência</li>
	<li>Códigos de erros especificos para cada erro de validação</li>
	<li>Manter histórico das alterações</li>
</ul>
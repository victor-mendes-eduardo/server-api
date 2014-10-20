Server API
============================================================

API REST para gerenciar um catálogo de servidores de aplicação assim como as aplicações hospedadas nestes.


<h2>API de Gerenciamento de Servidores</h2>

<h3>Criando um Servidor de Aplicação</h3>

curl --verbose -d "{\"name\": \"Minha Aplicação\", \"status\": \"RUNNING\", \"ipAddress\": \"192.168.50.2\"}" -H "Content-Type: application/json" http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/appServers

<h3>Obter um servidor</h3>

curl --verbose http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/appServers/{id_do_servidor}

<h3>Remover um servidor</h3>

curl --verbose -X DELETE http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/appServers/{id_do_servidor}

<h3>Atualizando um servidor</h3>

curl --verbose -d "{\"name\": \"Minha Aplicação\", \"status\": \"RUNNING\", \"ipAddress\": \"192.168.50.2\"}" -H "Content-Type: application/json" -X PUT http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/appServers/{id_do_servidor}

<h3>Listando Servidores</h3> 

curl --verbose http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/appServers

<h3>Filtros</h3>

curl --verbose http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/appServers?name=<nome_do_servidor>

curl --verbose http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/appServers?ipAddress=<endereco_do_servidor>

curl --verbose http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/appServers?status=<status_do_servidor>

curl --verbose http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/appServers?tag=<tag_do_servidor>

<h3>Adicionando uma aplicação nova a um servidor </h3>

curl --verbose -d "{\"name\": \"Aplicação\", \"url\": \"http://www.minhaaplicacao.com.br/api\"}" -H "Content-Type: application/json" http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/appServers/{id_do_servidor}/applications

<h3>Removendo uma aplicação de um Servidor</h3> 

curl --verbose -X DELETE http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/appServers/{id_do_servidor}/applications/{id_da_aplicacao}


<h2>API de Gerenciamento de Aplicações</h2>

<h3>Criando uma Aplicação</h3>

curl --verbose -d "{\"name\": \"Aplicação\", \"url\": \"http://www.minhaaplicacao.com.br/api\"}" -H "Content-Type: application/json" http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/applications

<h3>Obter uma Aplicação</h3>

curl --verbose http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/applications/{id_do_Aplicação}

<h3>Remover uma Aplicação</h3>

curl --verbose -X DELETE http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/applications/{id_do_Aplicação}

<h3>Atualizando uma Aplicação</h3>

curl --verbose -d "{\"name\": \"Aplicação\", \"url\": \"http://www.minhaaplicacao.com.br/api\"}" -H "Content-Type: application/json" -X PUT http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/applications/{id_do_Aplicação}

<h3>Listando Aplicações</h3> 

curl --verbose http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/applications

<h3>Filtros</h3>

curl --verbose http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/applications?name=<nome_do_Aplicação>

curl --verbose http://victor.mendes:123456@server-api.elasticbeanstalk.com/api/v1/applications?url=<endereco_do_Aplicação>

<h2>Documentação</h2>

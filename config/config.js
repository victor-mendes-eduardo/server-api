// Configuração do banco de dados de acordo com os environments
exports.db = {
	dev: { url: "ds047050.mongolab.com:47050/server-api-dev", user: "victor.mendes", pass: "123456"},
	test: { url: "ds047020.mongolab.com:47020/server-api-test", user: "victor.mendes", pass: "123456"},
	prod: { url: "ds047050.mongolab.com:47050/server-api-dev", user: "victor.mendes", pass: "123456"}
}

//Versões disponiveis na API, a lista 'all', contém todas as versões disponiveis
//para desativar uma versão basta remover da lista
exports.versions = {
	all: ['v1'],
	stable: 'v1', // Versão congelada e não sofrerá alterações
	development: 'v1', // Versão em desenvolvimento e pode ter alterações
	deprecating: 'v1' // versão a ser abandonada em breve
} 

//Implementação dummy de usuarios com senhas cifradas com SHA1
exports.users = [{ username: 'victor.mendes', pass:'7c4a8d09ca3762af61e59520943dc26494f8941b' }]
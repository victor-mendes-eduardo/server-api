// Lista de versões atualmente disponiveis
exports.versions = {
	all: ['v1'],
	stable: 'v1', // Versão congelada e não sofrerá alterações
	development: 'v1', // Versão em desenvolvimento e pode ter alterações
	deprecating: 'v1' // versão a ser abandonada em breve
} 

//Implementação dummy de usuarios com senhas cifradas com SHA1
exports.users = [{ username: 'victor.mendes.eduardo@gmail.com', pass:'7c4a8d09ca3762af61e59520943dc26494f8941b' }]
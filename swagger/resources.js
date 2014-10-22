var sw = require("swagger-node-express");
var param = require("../node_modules/swagger-node-express/lib/paramTypes.js");
var url = require("url");
var swe = sw.errors;
var appServerService = require("../controllers/appServerController");
var applicationService = require("../controllers/applicationController");

exports.createAppServer = {
    'spec': {
        description : "Operações de Servidor de Aplicação",  
        path : "/v1/appServers/",
        method: "POST",
        summary : "Cria um novo Servidor de Aplicação",
        notes : "Em caso de sucesso retorna status 201 e header Location.",
        type : "AppServerPost",
        nickname : "createServer",
        produces : ["application/json"],
        parameters : [param.body("body", "Representação JSON do Servidor de Aplicação a ser criado.", "AppServerPost")],
        responseMessages : [{code:"201", message:"Servidor criado com sucesso"}, {code:400, message:"Nome inválido"}, {code:400, message:"Status inválido"}, {code:400, message:"IP inválido"}, {code: "500", message: "Erro na API"}]
    },
    'action': function (req, res) {
        appServerService.create(req, res);
    }
};

exports.updateAppServer = {
    'spec': {
        description : "Operações de Servidor de Aplicação",  
        path : "/v1/appServers/{appServerId}",
        method: "PUT",
        summary : "Atualiza um Servidor de Aplicação",
        notes : "Em caso de sucesso retorna status 200.",
        type : "AppServerPost",
        nickname : "updateServer",
        produces : ["application/json"],
        parameters : [param.path("appServerId", "ID do servidor a ser atualizado", "string"),
                      param.body("body", "Representação JSON do Servidor de Aplicação a ser atualizado", "AppServerPost")],
        responseMessages : [{code:"200", message:"Servidor atualizado com sucesso"}, {code:400, message:"Nome inválido"}, {code:400, message:"Status inválido"}, {code:400, message:"IP inválido"}, {code:404, message:"Servidor não encontrado"}, {code: "500", message: "Erro na API"}]
    },
    'action': function (req, res) {
        appServerService.update(req, res);
    }
};

exports.listAppServer = {
    'spec': {
        description : "Operações de Servidor de Aplicação",  
        path : "/v1/appServers/",
        method: "GET",
        summary : "Lista todos os Servidores de Aplicação",
        notes : "Em caso de sucesso retorna status 200 e a lista de servidores com paginação",
        type : "AppServerList",
        nickname : "listAppServer",
        produces : ["application/json"],
        parameters : [param.query("max", "Paginação (max)", "integer", false, null, 10), param.query("offset", "Paginação (offset)", "integer", false, null, '0'),
                      param.query("name", "Nome do Servidor", "String"), param.query("status", "Status do Servidor", "String", false, ['RUNNING', 'STOPPED']),
                      param.query("tag", "Tag do Servidor", "String"), param.query("ipAddress", "IP do Servidor", "String")],
        responseMessages : [{code:"200", message:"Servidores listados com sucesso"}, {code: "500", message: "Erro na API"}]
    },
    'action': function (req, res) {
        appServerService.list(req, res);
    }
};


exports.getAppServer = {
    'spec': {
        description : "Operações de Servidor de Aplicação",  
        path : "/v1/appServers/{appServerId}",
        method: "GET",
        summary : "Recupera um Servidor de Aplicação",
        notes : "Em caso de sucesso retorna status 200 e a representação do recurso",
        type : "AppServerView",
        nickname : "getAppServer",
        produces : ["application/json"],
        parameters : [param.path("appServerId", "ID do servidor a ser recuperado", "string")],
        responseMessages : [{code:"200", message:"Servidor encontrado com sucesso"}, {code:404, message:"Servidor não encontrado"}, {code: "500", message: "Erro na API"}]
    },
    'action': function (req, res) {
        appServerService.show(req, res);
    }
};

exports.removeAppServer = {
    'spec': {
        description : "Operações de Servidor de Aplicação",  
        path : "/v1/appServers/{appServerId}",
        method: "DELETE",
        summary : "Remove um Servidor de Aplicação",
        notes : "Retorna 200 em caso de remoção com sucesso.",
        nickname : "removeAppServer",
        produces : ["application/json"],
        parameters : [param.path("appServerId", "ID do servidor a ser recuperado", "string")],
        responseMessages : [{code:"200", message:"Servidor removido com sucesso"}, {code:404, message:"Servidor não encontrado"}, {code: "500", message: "Erro na API"}]
    },
    'action': function (req, res) {
        appServerService.remove(req, res);
    }
};

exports.getServerApplications = {
    'spec': {
        description : "Operações de Servidor de Aplicação",  
        path : "/v1/appServers/{appServerId}/applications",
        method: "GET",
        summary : "Lista as aplicações de um servidor",
        notes : "Retorna 200 e a lista de aplicações de um dado servidor",
        nickname : "listServerApplications",
        produces : ["application/json"],
        parameters : [param.path("appServerId", "ID do servidor", "string")],
        responseMessages : [{code:"200", message:"Lista de aplicações de um servidor"}, {code:404, message:"Servidor não encontrado"}, {code: "500", message: "Erro na API"}]
    },
    'action': function (req, res) {
        appServerService.listApplications(req, res);
    }
};

exports.addApplicationToServer = {
    'spec': {
        description : "Operações de Servidor de Aplicação",  
        path : "/v1/appServers/{appServerId}/applications",
        method: "POST",
        summary : "Cria uma aplicação sob demanda e adiciona a um servidor",
        notes : "Retorna 201 caso a aplicação seja criada e adicionada com sucesso",
        nickname : "addApplicationToServer",
        produces : ["application/json"],
        parameters : [param.path("appServerId", "ID do servidor", "string"), param.body("body", "Representação JSON da Aplicação a ser criada", "ApplicationPost")],
        responseMessages : [{code:"201", message:"Aplicação criada e adicionada com sucesso"}, {code:404, message:"Servidor não encontrado"}, {code: "500", message: "Erro na API"}]
    },
    'action': function (req, res) {
        appServerService.addApplication(req, res);
    }
};

exports.associateApplicationToServer = {
    'spec': {
        description : "Operações de Servidor de Aplicação",  
        path : "/v1/appServers/{appServerId}/applications/{applicationId}",
        method: "POST",
        summary : "Associa uma aplicação existente a um servidor",
        notes : "Retorna 200 caso a associação seja efetuada com sucesso",
        nickname : "associateApplication",
        produces : ["application/json"],
        parameters : [param.path("appServerId", "ID do servidor", "string"),param.path("applicationId", "ID da aplicação", "string")],
        responseMessages : [{code:"201", message:"Aplicação associada com sucesso"}, {code:404, message:"Servidor não encontrado"}, {code: "500", message: "Erro na API"}]
    },
    'action': function (req, res) {
        appServerService.addExistingApplication(req, res);
    }
};

exports.removeApplicationFromServer = {
    'spec': {
        description : "Operações de Servidor de Aplicação",  
        path : "/v1/appServers/{appServerId}/applications/{applicationId}",
        method: "DELETE",
        summary : "Desassocia uma aplicação de um servidor",
        notes : "Retorna 200 caso a desassociação seja efetuada com sucesso",
        nickname : "disassociateApplication",
        produces : ["application/json"],
        parameters : [param.path("appServerId", "ID do servidor", "string"),param.path("applicationId", "ID da aplicação", "string")],
        responseMessages : [{code:"201", message:"Aplicação desassociada com sucesso"}, {code:404, message:"Servidor não encontrado"}, {code: "500", message: "Erro na API"}]
    },
    'action': function (req, res) {
        appServerService.removeApplication(req, res);
    }
};

exports.createApplication = {
    'spec': {
        description : "Operações de Aplicação",  
        path : "/v1/applications/",
        method: "POST",
        summary : "Cria uma nova Aplicação",
        notes : "Em caso de sucesso retorna status 201 e header Location.",
        type : "ApplicationPost",
        nickname : "createAplication",
        produces : ["application/json"],
        parameters : [param.body("body", "Representação JSON da Aplicação a ser criada", "ApplicationPost")],
        responseMessages : [{code:"201", message:"Aplicação criada com sucesso"}, {code:400, message:"Nome inválido"}, {code:400, message:"URL inválida"}, {code: "500", message: "Erro na API"}]
    },
    'action': function (req, res) {
        applicationService.create(req, res);
    }
};

exports.updateApplication = {
    'spec': {
        description : "Operações de Aplicação",  
        path : "/v1/applications/{applicationId}",
        method: "PUT",
        summary : "Atualiza uma Aplicação",
        notes : "Em caso de sucesso retorna status 200",
        type : "ApplicationPost",
        nickname : "updateAplication",
        produces : ["application/json"],
        parameters : [param.path("applicationId", "ID do servidor a ser atualizado", "string"),
                      param.body("body", "Representação JSON da Aplicação a ser atualizada", "ApplicationPost")],
        responseMessages : [{code:"200", message:"Aplicação atualizada com sucesso"},{code:400, message:"Nome inválido"}, {code:400, message:"URL inválida"}, {code:404, message:"Aplicação não encontrada"}, {code: "500", message: "Erro na API"}]
    },
    'action': function (req, res) {
        applicationService.update(req, res);
    }
};

exports.getApplication = {
    'spec': {
        description : "Operações de Aplicação",  
        path : "/v1/applications/{applicationId}",
        method: "GET",
        summary : "Recupera uma Aplicação",
        notes : "Em caso de sucesso retorna status 200 e a representação do recurso",
        type : "ApplicationView",
        nickname : "getApplication",
        produces : ["application/json"],
        parameters : [param.path("applicationId", "ID da aplicação a ser recuperada", "string")],
        responseMessages : [{code:"200", message:"Aplicação encontrada com sucesso"}, {code:404, message:"Aplicação não encontrada"}, {code: "500", message: "Erro na API"}]
    },
    'action': function (req, res) {
        applicationService.show(req, res);
    }
};

exports.listApplications = {
    'spec': {
        description : "Operações de Servidor de Aplicação",  
        path : "/v1/applications/",
        method: "GET",
        summary : "Lista todas as Aplicações",
        notes : "Em caso de sucesso retorna status 200 e a lista de Aplicações com paginação",
        type : "ApplicationList",
        nickname : "listApplications",
        produces : ["application/json"],
        parameters : [param.query("max", "Paginação (max)", "integer", false, null, 10), param.query("offset", "Paginação (offset)", "integer", false, null, '0'),
                      param.query("name", "Nome da Aplicação", "String"), param.query("url", "URL da Aplicação", "String")],
        responseMessages : [{code:"200", message:"Aplicações listadas com sucesso"}, {code: "500", message: "Erro na API"}]
    },
    'action': function (req, res) {
        applicationService.list(req, res);
    }
};

exports.removeApplication = {
    'spec': {
        description : "Operações de Aplicação",  
        path : "/v1/applications/{applicationId}",
        method: "DELETE",
        summary : "Remove uma Aplicação",
        notes : "Retorna 200 em caso de remoção com sucesso",
        nickname : "removeApplication",
        produces : ["application/json"],
        parameters : [param.path("applicationId", "ID da aplicação a ser removida", "string")],
        responseMessages : [{code:"200", message:"Aplicação removida com sucesso"}, {code:404, message:"Aplicação não encontrada"}, {code: "500", message: "Erro na API"}]
    },
    'action': function (req, res) {
        applicationService.remove(req, res);
    }
};
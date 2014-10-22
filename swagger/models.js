exports.models = {
    "AppServerView":{
        "id":"AppServer",
        "required":[
            "name",
            "status",
            "ipAddress",
        ],
        "properties":{
            "id":{
                "type":"string",
                "description":"UUID do Servidor de Aplicação"
            },
            "name":{
                "type":"string",
                "description":"Nome do Servidor de Aplicação"
            },             
            "status":{
                "type":"string",
                "description":"Status do Servidor de Aplicação",
                "enum": [
                    "RUNNING",
                    "STOPPED"
                ]
            },             
            "ipAddress":{
                "type":"string",
                "description":"Endereço IP do Servidor de Aplicação"
            },
            "applications": {
                "type": "array",
                "description": "Lista de aplicações associadas a um dado servidor",
                "items": {
                    "$ref": "Application"
                }
            },               
            "tags": {
                "type": "array",
                "description": "Tags de um servidor, utilizadas para facilitar buscas",
                 "items": {
                    "type": "string"
                }
            },            
            "creationDate":{
                "type":"date-time",
                "description":"Data de criação do Servidor de Aplicação"
            },            
            "lastUpdated":{
                "type":"date-time",
                "description":"Data da última atualização do Servidor de Aplicação"
            }
        }
    },    
    "AppServerList":{
        "id":"AppServers",
        "required":[
            "count",
            "appServers",
        ],
        "properties":{
            "appServers":{
                "type": "array",
                "description": "Lista de servidores de aplicação ",
                "items": {
                    "$ref": "AppServerView"
                }
            },
            "count":{
                "type":"integer",
                "description":"Número de servidores que se incluem no criterio de filtro"
            },           
        }
    },
    "AppServerPost":{
        "id":"AppServer",
        "required":[
            "name",
            "status",
            "ipAddress",
        ],
        "properties":{
            "name":{
                "type":"string",
                "description":"Nome do Servidor de Aplicação"
            },             
            "status":{
                "type":"string",
                "description":"Status do Servidor de Aplicação",
                "enum": [
                    "RUNNING",
                    "STOPPED"
                ]
            },             
            "ipAddress":{
                "type":"string",
                "description":"Endereço IP do Servidor de Aplicação"
            },
            "tags": {
                "type": "array",
                "description": "Tags de um servidor, utilizadas para facilitar buscas",
                 "items": {
                    "type": "string"
                }
            },            
        }
    },
    "ApplicationView":{
      "id":"Application",
        "required":[
            "name",
            "url",
        ],
        "properties":{
            "id":{
                "type":"string",
                "description":"UUID da Aplicação"
            },
            "name":{
                "type":"string",
                "description":"Nome da Aplicação"
            },             
            "url":{
                "type":"string",
                "description":"URL da Aplicação",
            },             
            "description":{
                "type":"string",
                "description":"Descrição da Aplicação"
            },
            "creationDate":{
                "type":"date-time",
                "description":"Data de criação da Aplicação"
            },            
            "lastUpdated":{
                "type":"date-time",
                "description":"Data da última atualização da Aplicação"
            }
        }
    },
    "ApplicationPost":{
      "id":"Application",
        "required":[
            "name",
            "url",
        ],
        "properties":{
            "name":{
                "type":"string",
                "description":"Nome da Aplicação"
            },             
            "url":{
                "type":"string",
                "description":"URL da Aplicação",
            },             
            "description":{
                "type":"string",
                "description":"Descrição da Aplicação"
            }
        }
    },
    "ApplicationList":{
        "id":"Applications",
        "required":[
            "count",
            "applications",
        ],
        "properties":{
            "applications":{
                "type": "array",
                "description": "Lista de aplicações",
                "items": {
                    "$ref": "ApplicationView"
                }
            },
            "count":{
                "type":"integer",
                "description":"Número de aplicações que se incluem no criterio de filtro"
            },           
        }
    },
}
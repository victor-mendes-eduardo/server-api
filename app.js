//Módulos básicos
var express = require('express');
var load = require('express-load')
var morgan = require('morgan');
var swagger = require("./swagger/swaggerConfig");

//Módulos de HTTP
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect = require('connect');
var methodOverride = require('method-override');
var compression = require('compression');

//Meus módulos
var mongo = require('./utils/mongo'); // Setup mongodb connection
var middlewares = require('./utils/middlewares');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

swagger.configure(app, express);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method')) // Sobrecarrega o metodo HTTP com o parametro _method
app.use(compression({ threshold: 512 })) // comprime responses com mais de 512KB
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

process.on('uncaughtException', function (err) {
  console.error(err);
  console.error(err.stack);
});

// Redireciona para DOC se for acessado o root da aplicação
app.get('/', function(req, res){
    res.redirect('/docs');
});

/**
Filtro executado antes de todas as chamadas a API para validar
se a versão requisitada existe e é valida. Caso não exista
Bad Request é retornado com mensagem descritiva
*/
app.all(/v(\d+)\/.*$/, middlewares.versionFilter);
app.all(/v(\d+)\/.*$/, middlewares.basicAuthFilter);
app.all(/v(\d+)\/.*$/, middlewares.logInput);

load('controllers').then('routes').into(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    console.log(err.stack);
    if(err.status == 404){
        res.json({ status: 404, message: "O carminho especificado não foi encontrado" });
    }else{
        res.json({ status: 500, message:"Erro inesperado." });
    }
});

module.exports = app;

var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Server API listening at http://%s:%s', server.address().address, server.address().port)
})
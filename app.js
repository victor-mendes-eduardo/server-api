//Módulos básicos
var express = require('express');
var load = require('express-load')
var morgan = require('morgan');

//Módulos de HTTP
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect = require('connect');
var methodOverride = require('method-override');
var compression = require('compression');

//Meus módulos
var mongo = require('./utils/mongo'); // Setup mongodb connection
var filters = require('./utils/filters'); // Setup mongodb connection

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method')) // Sobrecarrega o metodo HTTP com o parametro _method
app.use(compression({ threshold: 512 })) // comprime responses com mais de 512KB
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
Filtro executado antes de todas as chamadas a API para validar
se a versão requisitada existe e é valida. Caso não exista
Bad Request é retornado com mensagem descritiva
*/
app.all(/^\/(api)\/.*$/, filters.versionFilter);
app.all(/^\/(api)\/.*$/, filters.basicAuthFilter);

load('controllers').then('routes').into(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.json({ status: 500, message:"Erro inesperado." });
});

module.exports = app;

var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Server API listening at http://%s:%s', server.address().address, server.address().port)
})
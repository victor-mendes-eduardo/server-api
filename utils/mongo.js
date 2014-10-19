var config = require('../config/config')
var env = process.env.NODE_ENV || 'dev'
require('mongoose').connect(config.db[env].url, { user: config.db[env].user, pass: config.db[env].pass });
const express = require('express');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const morgan = require('morgan')
const allowCors = require('./cors')

var server = express();

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(morgan('dev'))
server.use(methodOverride());

module.exports = server
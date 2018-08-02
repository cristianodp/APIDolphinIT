const port = 3000

const express = require('express');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const morgan = require('morgan')
const restful = require('node-restful')
const mongoose = restful.mongoose
mongoose.Promise = global.Promise;

const allowCors = require('./cors')


var server = express();

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(morgan('dev'))
server.use(methodOverride());

mongoose.connect("mongodb://db:27017/dolphinIT", { useNewUrlParser: true });

const { customerSchema, userSchema, categorySchema } = require("../api/dolphinSchemas")

var validateCustomer = function (req, res, next) {
    //req.body.code
    // if (req.body.code) {
    return next({ status: 400, err: "Notes need a creator" });
    return next();

}

var Category = server.category = restful.model('category', categorySchema)
    .methods(['get', 'post', 'put', 'delete']);

Category.register(server, '/categories');    

var User = server.user = restful.model('user', userSchema)
    .methods(['get', 'post', 'put', 'delete']);

User.register(server, '/users');

var Customer = server.customer = restful.model('customer', customerSchema)
    .methods(['get', 'post', 'put', 'delete']);


Customer.register(server, '/customers');

server.listen(port, () => {
    console.log(`running on port ${port}`);
});

module.exports = server
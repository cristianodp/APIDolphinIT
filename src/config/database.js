const mongoose = require('mongoose')
mongoose.Promise = global.Promise
//module.exports =  mongoose.connect('mongodb://db/dolphinIt')

const url = process.env.MONGOLAB_URI? process.env.MONGOLAB_URI : "mongodb://db:27017/dolphinIT"

module.exports =  mongoose.connect(url, { useNewUrlParser: true });

/*
mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' é menor que o limite mínimo de '{MIN}'."
*/
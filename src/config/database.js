const mongoose = require('mongoose')
mongoose.Promise = global.Promise
//module.exports =  mongoose.connect('mongodb://db/dolphinIt')
module.exports =  mongoose.connect("mongodb://db:27017/dolphinIT", { useNewUrlParser: true });
/*
mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' é menor que o limite mínimo de '{MIN}'."
*/
const restful = require('node-restful')
const { ownerSchema, userSchema, categorySchema, customerSchema, itemSchema } = require("./dolphinSchemas")

const ownerModel = restful.model('owner', ownerSchema).methods(['get', 'post', 'put', 'delete']);
const userModel = restful.model('user', userSchema).methods(['get', 'post', 'put', 'delete']);
const categoryModel = restful.model('category', categorySchema).methods(['get', 'post', 'put', 'delete']);
const customerModel = restful.model('customer', customerSchema).methods(['get', 'post', 'put', 'delete']);
const itemModel = restful.model('item', itemSchema).methods(['get', 'post', 'put', 'delete']);

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

itemModel.route('full', (req, res, next) => {

    itemModel.aggregate([
        {
            $match:
                { 'customerId': { $eq: req.query.customerId } }
        }
        , {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        }], (err, itens) => {
            if (err) {
                return res.status(400).send(err)
            } else {
                return res.status(200).send(itens)
            }
        })
})


itemModel.route('expiredCount', (req, res, next) => {

    itemModel.find({ 'dueDate': { $lt: (new Date()) } }).count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json( value )
        }
    })
})

itemModel.route('warningCount', (req, res, next) => {


    itemModel.find({ $and: [{ "dueDate": { $gte: (new Date()) } }
        , { "dueDate": { $lte: (new Date().addDays(30)) } }] }).count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json( value )
        }
    })
})


itemModel.route('normalCount', (req, res, next) => {

    itemModel.find({ "dueDate": { $gt: (new Date().addDays(30)) }}).count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json( value )
        }
    })
})


itemModel.route('expired', (req, res, next) => {

    itemModel.find({ 'dueDate': { $lt: (new Date()) } }, (error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json( value )
        }
    })
})

itemModel.route('warning', (req, res, next) => {


    itemModel.find({ $and: [{ "dueDate": { $gte: (new Date()) } }
        , { "dueDate": { $lte: (new Date().addDays(30)) } }] },(error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json( value )
        }
    })
})


itemModel.route('normal', (req, res, next) => {

    itemModel.find({ "dueDate": { $gt: (new Date().addDays(30)) }}, (error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json( value )
        }
    })
})


module.exports = {
    ownerModel,
    userModel,
    categoryModel,
    customerModel,
    itemModel
}




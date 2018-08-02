const { ownerModel, userModel, categoryModel, customerModel, itemModel } = require("../api/dolphinModels")

module.exports = function (server) {

  const ownerRoute = server.owner = ownerModel
  ownerRoute.register(server, '/owners');

  const userRoute = server.user = userModel
  userRoute.register(server, '/users');

  const categoryRoute = server.category= categoryModel
  categoryRoute.register(server, '/categories');

  const customerRoute = server.customer = customerModel
  customerRoute.register(server, '/customers');

  const itemRoute = server.item = itemModel
  itemRoute.register(server, '/itens');
 
}
const port = process.env.PORT || 5000

const server = require("./config/server");
const routes = require('./config/routes');
require("./config/database");
routes(server);

server.listen(port, () => {
    console.log("running on port "+port);
});

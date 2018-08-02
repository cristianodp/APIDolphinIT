

const server = require("./config/server");
const routes = require('./config/routes');
require("./config/database");
routes(server);

server.listen(3000, () => {
    console.log("running on port 3000");
});

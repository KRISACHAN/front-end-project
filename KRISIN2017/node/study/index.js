const server3 = require("./server3");
const router = require("./router");

server3.start(router.route);

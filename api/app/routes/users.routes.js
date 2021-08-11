const routes = require("express").Router();
const { register, login } = require("../controller/Users");

routes.post("/login", login);

routes.post("/register", register);

module.exports = routes;

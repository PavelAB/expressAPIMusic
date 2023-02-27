const authRouter = require ("express").Router();
const authController = require("../controllers/auth.controller");


authRouter.route('/register')
    .post(authController.register)

authRouter.route('/login')
    .post(authController.login)

module.exports = authRouter;

const authRouter = require ("express").Router();
const authController = require("../controllers/auth.controller");
const bodyValidation = require("../middlewares/body.validator");
const registerValidator = require("../validators/auth.validators");


authRouter.route('/register')
    .post(bodyValidation(registerValidator), authController.register)

authRouter.route('/login')
    .post(authController.login)

module.exports = authRouter;

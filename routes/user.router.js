const userRouter = require('express').Router();
const userController=require('../controllers/user.controller');
const bodyValidation = require('../middlewares/body.validator');
const pagination = require('../middlewares/pagination.middleware');
const updateUserValidator = require('../validators/user.validators');


userRouter.route('/')
    //Pour utiliser un middleware (router, middlewares, controller)
    .get(pagination(),userController.getAll)
    .post(userController.create)

userRouter.route('/:id')
    .get(userController.getById)
    .put(bodyValidation(updateUserValidator), userController.update)
    .delete(userController.delete)


module.exports=userRouter;
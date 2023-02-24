const userRouter = require('express').Router();
const userController=require('../controllers/user.controller');
const pagination = require('../middlewares/pagination.middleware');


userRouter.route('/')
    //Pour utiliser un middleware (router, middlewares, controller)
    .get(pagination( { defaultLimit : 30 } ), userController.getAll)
    .post(userController.create)

userRouter.route('/:id')
    .get(userController.getById)
    .put(userController.update)
    .delete(userController.delete)


module.exports=userRouter;
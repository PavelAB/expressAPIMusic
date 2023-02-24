const genreRouter = require('express').Router();
const genreController=require('../controllers/genre.controller');
const pagination = require('../middlewares/pagination.middleware');

// genreRouter.get('/',()=>{})
// genreRouter.get('/:id',()=>{})
// genreRouter.post('/',()=>{})
// genreRouter.put('/:id',()=>{})
// genreRouter.delete('/:id',()=>{})

genreRouter.route('/')
    //Pour utiliser un middleware (router, middlewares, controller)
    .get(pagination( { defaultLimit : 30 } ), genreController.getAll)
    .post(genreController.create)

genreRouter.route('/:id')
    .get(genreController.getById)
    .put(genreController.update)
    .delete(genreController.delete)


module.exports=genreRouter;
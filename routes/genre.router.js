const genreRouter = require('express').Router();
const genreController=require('../controllers/genre.controller');
const bodyValidation = require('../middlewares/body.validator');
const pagination = require('../middlewares/pagination.middleware');
const createGenreValidators = require('../validators/genre.validators');

// genreRouter.get('/',()=>{})
// genreRouter.get('/:id',()=>{})
// genreRouter.post('/',()=>{})
// genreRouter.put('/:id',()=>{})
// genreRouter.delete('/:id',()=>{})

genreRouter.route('/')
    //Pour utiliser un middleware (router, middlewares, controller)
    .get(pagination( { defaultLimit : 30 } ), genreController.getAll)
    .post(bodyValidation(createGenreValidators), genreController.create)

genreRouter.route('/:id')
    .get(genreController.getById)
    .put(bodyValidation(createGenreValidators), genreController.update)
    .delete(genreController.delete)


module.exports=genreRouter;
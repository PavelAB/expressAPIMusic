const albumRouter = require('express').Router() 
const albumController = require('../controllers/album.controller');
const bodyValidation = require('../middlewares/body.validator');
const pagination = require('../middlewares/pagination.middleware');
const createAlbumValidators = require('../validators/album.validators');

albumRouter.route('/')
    .get(pagination( { defaultLimit : 30 } ),albumController.getAll)
    .post(bodyValidation(createAlbumValidators), albumController.create)

albumRouter.route('/:id')
    .get(albumController.getById)
    .put(bodyValidation(createAlbumValidators),albumController.update)
    .delete(albumController.delete)
    
module.exports=albumRouter;
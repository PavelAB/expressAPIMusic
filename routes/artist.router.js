const artistRouter = require('express').Router() 
const artistController = require('../controllers/artist.controller');
const bodyValidation = require('../middlewares/body.validator');
const pagination = require('../middlewares/pagination.middleware');
const createArtistValidators = require('../validators/artist.validators');

artistRouter.route('/')
    .get(pagination( { defaultLimit : 30 } ),artistController.getAll)
    .post(bodyValidation(createArtistValidators), artistController.create)

artistRouter.route('/:id')
    .get(artistController.getById)
    .put(bodyValidation(createArtistValidators),artistController.update)
    .delete(artistController.delete)
    
module.exports=artistRouter;
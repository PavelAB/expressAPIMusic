const trackRouter = require('express').Router() 
const trackController = require('../controllers/track.controller');
const bodyValidation = require('../middlewares/body.validator');
const pagination = require('../middlewares/pagination.middleware');
const {createTrackValidator,updateTrackValidator} = require('../validators/track.validators');

trackRouter.route('/')
    .get(pagination( { defaultLimit : 30 } ),trackController.getAll)
    .post(bodyValidation(createTrackValidator) ,trackController.create)

trackRouter.route('/:id')
    .get(trackController.getById)
    .put(bodyValidation(updateTrackValidator) ,trackController.update)
    .delete(trackController.delete)
    
module.exports=trackRouter;
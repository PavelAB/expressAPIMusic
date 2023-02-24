const albumRouter = require('./album.router');
const artistRouter = require('./artist.router');
const genreRouter = require('./genre.router');
const trackRouter = require('./track.router');
const userRouter = require('./user.router');

const router = require('express').Router();

router.use('/genre', genreRouter);
router.use('/artist', artistRouter);
router.use('/track', trackRouter);
router.use('/album', albumRouter);
router.use('/user',userRouter);

module.exports=router;
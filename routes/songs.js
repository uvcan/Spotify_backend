const express=require('express');
const router=express.Router();
const songController=require('../controllers/songs_controller');
const passport = require('passport');


router.post('/create',passport.authenticate('jwt',{session:false}),songController.crete);
router.get('/mysong',passport.authenticate('jwt',{session:false}),songController.mySong);
router.get('/artistsong',passport.authenticate('jwt',{session:false}),songController.artistSongs);
router.get('/songname',passport.authenticate('jwt',{session:false}),songController.songName);

module.exports=router;
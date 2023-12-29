const express=require('express');
const router=express.Router();
const songController=require('../controllers/songs_controller');
const passport = require('passport');


router.post('/create',passport.authenticate('jwt',{session:false}),songController.crete);
router.get('/mySong',passport.authenticate('jwt',{session:false}),songController.mySong);

module.exports=router;
const express=require('express');
const router=express.Router();
const passport=require('passport');

router.use('/users',require('./users'));
router.use('/songs',passport.authenticate("jwt",{session:false}),require('./songs'));
router.use('/playlist',passport.authenticate("jwt",{session:false}),require('./playlist'));

module.exports=router;
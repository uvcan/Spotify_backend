const express=require('express');
const router=express.Router();

router.use('/users',require('./users'));
router.use('/songs',require('./songs'));
router.use('/playlist',require('./playlist'));

module.exports=router;
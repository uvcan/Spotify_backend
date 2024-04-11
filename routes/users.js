const express=require('express');
const router=express.Router();
const userController=require('../controllers/users_contoller');

router.post('/register',userController.create);
router.post('/sign-in',userController.createSession);



module.exports=router;
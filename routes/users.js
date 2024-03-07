const express=require('express');
const router=express.Router();
const userController=require('../controllers/users_contoller');

router.post('/register',userController.create);
router.get('/sign-in',userController.createSession);



module.exports=router;
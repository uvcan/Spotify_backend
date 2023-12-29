const User=require('../models/user');
const bcrypt=require('bcrypt');
const {getToken}=require('../utils/helpers');
module.exports.create= async function(req,res){

    const {email,password,firstName,lastName,username}=req.body;
    const user=await User.findOne({email:email});
    if(user){
        return res
                .status(403)
                .json({error:"user alreadyexist with the email id"});
    }
    const hashPassword=bcrypt.hash(password,10);
    const newUserData={
        email,
        hashPassword,
        firstName,
        lastName,
        username
    };
    const newUser=User.create(newUserData);


    const token=getToken(email,newUser);
    const usertoReturn={...newUser.toJSON ,token};
    delete usertoReturn.password;
    return res
        .status(200)
        .json(usertoReturn);

}


module.exports.createSession=async function(req,res){
    const {email ,password}=req.body;
    const user = await User.findOne({email:email});
    if(!user){
        return res
            .status(403)
            .json('Invalid credentilas');
    }
    const isValidPasword=await bcrypt.compare(user.password,password);
    if(!isValidPasword){
        return res
            .status(403)
            .json('Invalid credentials');
    }
    const token=getToken(user.email,user);
    const usertoReturn={...user.toJSON ,token};
    delete usertoReturn.password;
    return res
        .status(200)
        .json(usertoReturn);

}
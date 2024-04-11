const User=require('../models/user');
const bcrypt=require('bcrypt');
const {getToken}=require('../utils/helpers');

//Creating the a new user on the app
module.exports.create= async function(req,res){

    const {email,password,firstName,lastName,username}=req.body;
    const user=await User.findOne({email:email});
    if(user){
        return res
                .status(403)
                .json({error:"user alreadyexist with the email id"});
    }
    const hashPassword=await bcrypt.hash(password,10);
    const newUserData={
        email,
        password: hashPassword,
        firstName,
        lastName,
        username
    };
    const newUser=await User.create(newUserData);
    await newUser.save();
    //console.log(newUser);
    const token=await getToken(email,newUser);
    console.log(token);
    const userToReturn = {...newUser.toJSON(), token};
    //console.log(userToReturn);
    delete userToReturn.password;
    return res
        .status(200)
        .json(userToReturn);

}


//Log-in user 
module.exports.createSession=async function(req,res){
    const {email ,password}=req.body;
    const user = await User.findOne({email:email});
    if(!user){
        return res
            .status(403)
            .json({err:'Invalid credentilas '});
    }
    const isValidPasword=await bcrypt.compare(password, user.password);
    if(!isValidPasword){
        return res
            .status(403)
            .json({err:'Invalid credentials'});
    }
    const token=getToken(user.email,user);
    const usertoReturn={...user.toJSON() ,token};
    delete usertoReturn.password;
    return res
        .status(200)
        .json(usertoReturn);

}


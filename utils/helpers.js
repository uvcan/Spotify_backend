const jwt=require('jsonwebtoken');

module.exports.getToken=function(email,user){
    const token =jwt.sign(
        {sub:user._id},
        'thisKeyIsSupposedToBeSecret'
        );
    return token;
}
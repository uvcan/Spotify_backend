const express= require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const db=require('./config/mongoose');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();

const port= 8080;
const app=express();
app.use(express.json());

const User=require('./models/user');

//use mongoose to connect to Mongo Db Atlas
// mongoose.connect(
//                  "mongodb+srv://spotify:"+process.env.MONGO_PASSWORD+"@cluster0.auorfkw.mongodb.net/?retryWrites=true&w=majority",
//             {
//                     // useNewUrlParser: true, 
//                     // useUnifiedTopology: true
//                 }
//             )
//             .then((x)=>{
//                 console.log('Connected to Mongo DB');
//             })
//             .catch((err)=>{
//                 console.log('Error in connecting to DB');
//             });

app.get('/',function(req,res){
    return res.send('Hellow world!');
});

//Use JWT for authentication
var opts={}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSPORT_JWT_SECREAT;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


//use express router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Erron in running the server ${port}`);
    }
    console.log(`Server is running on : ${port}`);
});
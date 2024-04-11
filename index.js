const express= require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const db=require('./config/mongoose');
const cors=require('cors');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();

const port= 8080;
const app=express();
app.use(cors());

app.use(express.json());

const User=require('./models/user');


app.get('/',function(req,res){
    return res.send('Hellow world!');
});


// setup passport-jwt
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "thisKeyIsSupposedToBeSecret",
  };
  
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      //console.log("JWT Payload:", jwt_payload); // Debugging line
      try {
        const user = await User.findOne({ _id: jwt_payload.sub  });
        //console.log("Found User:", user); // Debugging line
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
  

//use express router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Erron in running the server ${port}`);
    }
    console.log(`Server is running on : ${port}`);
});
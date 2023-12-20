const express= require('express');
const port= 8080;
const app=express();


app.get('/',function(req,res){
    return res.send('Hellow world!');
});


app.listen(port,function(err){
    if(err){
        console.log(`Erron in running the server ${port}`);
    }
    console.log(`Server is running on : ${port}`);
});
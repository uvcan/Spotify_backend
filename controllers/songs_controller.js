const Song=require('../models/song');
const User=require('../models/user');

//Creating songs
module.exports.crete=async function(req,res){
    const {name,thumbnail,track}=req.body;
    const artist=req.user._id;
    if(!name || !thumbnail || !track){
        return res
            .status(301)
            .json('Insufficent details to create a song');
    }
    const songDetails={name,thumbnail,track,artist};
    const song=await Song.create(songDetails);
    return res.status(200).json(song);
}

//Fetching the songs as per artist OR the song that artist has published 
module.exports.mySong=async function(req,res){
    
    const songs=await Song.findOne({artist:req.user._id});
    return res.status(200).json({data:songs});
}


//Get all the song that has been published by an artist
module.exports.artistSongs=async function(req,res){
    const {artistId}=req.params.artistId;
    //If artist dose not exist
    const user=User.find({_id:artistId});
    if(!user){
        return res.status(301).json({err:'Artist dose not exist'});
    }
    const songs=await Song.find({artist:artistId});
    return res.status(200).json({data:songs});
}


//Get the song with the help of name of the song 
module.exports.songName=async function(req,res){
    const {songName}=req.params.songName;
    //Study pattern matching insted of direct song matching 
    const songs=await Song.find({name:songName});
    return res.status(200).json({data:songs});
}


    



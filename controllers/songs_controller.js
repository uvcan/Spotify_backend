const Song=require('../models/song');
const User=require('../models/user');

//Creating songs
module.exports.crete=async function(req,res){
    const {name,thumbnail,track}=req.body;
    const artist=req.user._id;
    if(!name || !thumbnail || !track){
        return res
            .status(301)
            .json({err:'Insufficent details to create a song'});
    }
    const songDetails={name,thumbnail,track,artist};
    const song=await Song.create(songDetails);
    return res.status(200).json({data:song});
}

//My Song OR Fetching the songs as per artist OR the song that artist has published 
module.exports.mySong=async function(req,res){
    
    const songs=await Song.find({artist:req.user._id});
    return res.status(200).json({data:songs});
}


//Get all the song that has been published by an artist
module.exports.artistSongs=async function(req,res){
    const artistId=req.params.artistid;
    console.log(artistId);
    //If artist dose not exist
    const artist=await User.findOne({_id:artistId});
    if(!artist){
        return res.status(301).json({err:'Artist dose not exist'});
    }
    const songs=await Song.find({artist:artistId});
    return res.status(200).json({data:songs});
}


//Get the song with the help of name of the song 
module.exports.songName=async function(req,res){
    const songName=req.params.songName;
    //console.log(songName);
    //Study pattern matching insted of direct song matching 
    const songs=await Song.find({name:songName});
    return res.status(200).json({data:songs});
}


    



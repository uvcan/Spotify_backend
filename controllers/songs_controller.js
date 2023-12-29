const Song=require('../models/song');

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

//Fetching the songs as per artist
module.exports.mySong=async function(req,res){
    
    const songs=await Song.find({artist:req.user._id});
    return res.status(200).json({data:songs});
}
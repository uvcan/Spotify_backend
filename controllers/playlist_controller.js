const Playlist=require('../models/playlist');
const User=require('../models/user');
const Song=require('../models/song');


//Creating a playlist for the user 
module.exports.create=async function(req,res){
    const currentUser=req.user;
    const {name, thumbnail,songs}=req.body;
    if(!name || !thumbnail || !songs){
        return res
            .status(301)
            .json({err:'Insufficent data'});
    }
    const playlistData={
        name,
        thumbnail,
        songs,
        owner:currentUser._id,
        collabrators:[],
    }
    const playlist=await Playlist.create(playlistData);
    return res
        .status(200)
        .json({data:playlist});

}

//Get all playlist by id
module.exports.getPlaylist=async function (req,res){
    const playlistId=req.params.playlistId;
    const playlist=await Playlist.findOne({_id:playlistId});
    if(!playlist){
        return res.status(302).json({err:"Invalid request"});
    }
    return res.status(200).json({data:playlist});

}


//get all playlist made by an artist
module.exports.getArtistplaylist=async function(req,res){
    const artistId=req.params.artistId;
    //we can also check if an artist exit with the given artist id
    const artist=await User.findOne({_id:artistId});
    if(!artist){
        return res.status(302).json({err:"Invalid request with the artist id"})
    }
    const playlist=await Playlist.find({owner:artistId});
    return res.status(200).json({data:playlist});
}


//Add song to the playlist
module.exports.addSong=async function(req,res){
    const currentUser=req.user;
    const {playlistId,songId}=req.body;
    //Check if playlist is valid or not 
    const playlist=await Playlist.findOne({_id:playlistId});
    if(!playlist){
        return res.status(400).json({err:"Not allowed"});
    }
    //Check if the current user and playlist owener are same or not 
    if(playlist.owner != currentUser._id && !playlist.collabrators.includes(currentUser._id) ){
        return res.status(400).json({err:"Not allowed"});
    }
    //Check if the song is valid or not 
    const song=await Song.findOne({_id:songId});
    if(!song){
        return res.status(400).json({err :"Not allowed"});
    }

    //Finally we can add the song to the playlist
    playlist.songs.push(songId);
    await playlist.save();

    return res.status(200).json({data:playlist});

}
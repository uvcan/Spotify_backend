const mongoose=require('mongoose');

const Playlist=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    track:{
        type:String,
        required:true
    },
    artist:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
    
});


const PlaylistModel=mongoose.model('Playlist',Playlist);
module.exports=PlaylistModel;
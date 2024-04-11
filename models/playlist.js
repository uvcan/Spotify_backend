const mongoose=require('mongoose');

const PlaylistSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    songs:[
        {
            type:mongoose.Types.ObjectId,
            ref:'song'
        }
    ],
    collabrators:[
        {
            type:mongoose.Types.ObjectId,
            ref:'user'
        }
    ]
    
});


const Playlist=mongoose.model('Playlist',PlaylistSchema);
module.exports=Playlist;